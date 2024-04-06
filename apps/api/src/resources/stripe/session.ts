import { z } from 'zod';
import Stripe from 'stripe';
import { AppKoaContext, Next, AppRouter, Product } from 'types';
import { Cart } from 'types';
import cartService from 'resources/cart/cart.service';
import { getRecord } from 'resources/record/actions/getRecord';
import { validateMiddleware } from 'middlewares';

const stripe = new Stripe('sk_test_51P29dT08aI5ox2vdHCnWiD0YiSJHMxDvBPzOAG3VQajb9Jne5mS4TWFRnq6ibRQhkVzGgwt9fTPG5OcEb94Qqd1F00e45n1nrx');
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