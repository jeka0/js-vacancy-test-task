import { AppKoaContext, Next } from 'types';
import { COOKIES } from 'app-constants';

const storeTokenToState = async (ctx: AppKoaContext, next: Next) => {
  let accessToken = ctx.cookies.get(COOKIES.ACCESS_TOKEN);
  console.log(accessToken);
  console.log(COOKIES.ACCESS_TOKEN);
  const { authorization } = ctx.headers;
  console.log(ctx.headers);
  console.log(authorization);
  if (!accessToken && authorization) {
    accessToken = authorization.replace('Bearer', '').trim();
  }

  if (accessToken) {
    ctx.state.accessToken = accessToken;
  }

  await next();
};

export default storeTokenToState;
