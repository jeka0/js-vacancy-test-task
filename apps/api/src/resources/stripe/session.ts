import { z } from 'zod';
import Stripe from 'stripe';
import { AppKoaContext, Next, AppRouter, Product } from 'types';
import { Cart } from 'types';
import cartService from 'resources/cart/cart.service';
import { getRecord } from 'resources/record/actions/getRecord';
import { validateMiddleware } from 'middlewares';
import { secret_key } from '../../config/stripeConfig.json';

const stripe = new Stripe(secret_key);
const host = 'http://localhost:3002';

const schema = z.object({
  userId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  
  const { userId } = ctx.validatedData;
  const cart:Cart = await cartService.findOne({ userId });
  cart.cartArray = await Promise.all(cart.cart.map(async recordId=>getRecord(recordId)));
  const date = new Date().toISOString();
  const lineItems = cart.cartArray.map(record=>{
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'INV-' + date,
        },
        unit_amount: record.product.price * 100 || 100,
      },
      quantity: record.quantity,
    };
  });
  console.log(userId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:lineItems,
    mode: 'payment',
    cancel_url: `${host}`,
    success_url: `${host}/pay/success`,
    payment_intent_data:{ metadata:{ userId } },
  });
  ctx.body = { sessionId: session.id };

}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};