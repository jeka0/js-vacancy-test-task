import psl from 'psl';
import url from 'url';

import { AppKoaContext } from 'types';
import { COOKIES } from 'app-constants';

import config from 'config';

export const setTokenCookies = ({
  ctx,
  accessToken,
}: { ctx: AppKoaContext, accessToken: string }) => {
  console.log(accessToken);
  const parsedUrl = url.parse(config.WEB_URL);
  console.log(config.WEB_URL);
  console.log(parsedUrl);
  if (!parsedUrl.hostname) {
    return;
  }

  const parsed = psl.parse(parsedUrl.hostname) as psl.ParsedDomain;
  const cookiesDomain = parsed.domain || undefined;
  console.log(cookiesDomain);
  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    domain: cookiesDomain,
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years
  });
};

export const unsetTokenCookies = (ctx: AppKoaContext) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
};

export default {
  setTokenCookies,
  unsetTokenCookies,
};
