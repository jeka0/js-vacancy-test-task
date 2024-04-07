
import Stripe from 'stripe';
import { AppKoaContext, AppRouter, Cart } from 'types';
import cartService from 'resources/cart/cart.service';
import recordService from 'resources/record/record.service';
import { productService } from 'resources/product';
import { Record } from 'types';
import { secret_key, secret_key_webhook } from '../../config/stripeConfig.json';

const stripe = new Stripe(secret_key);



async function handler(ctx: AppKoaContext) {
  const sig = ctx.request.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(ctx.request.rawBody, sig!, secret_key_webhook);
  } catch (err:any) {
    console.error('Error verifying webhook', err.message);
    ctx.status = 400;
    return;
  }

  // Обработка событий Stripe
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent);
      const userId = paymentIntent.metadata.userId;

      const cart:Cart = await cartService.findOne({ userId });
      cart.cart.forEach(async recordId=>{
        const record : Record = await recordService.updateOne(
          { _id: recordId },
          () => ({ date: new Date().toJSON() }),
        );
        await productService.updateOne(
          { _id: record.productId },
          () => ({ isSold:true }),
        );
      });
      cart.history = cart.cart.concat(cart.history);
      cart.cart = [];
      await cartService.updateOne(
        { userId },
        () => (cart),
      );
      // Здесь можно выполнить дополнительные действия при успешной оплате
      break;
    case 'payment_intent.payment_failed':
      const paymentFailedIntent = event.data.object;
      console.log('PaymentIntent failed!', paymentFailedIntent);
      break;
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.post('/webhook', handler);
};