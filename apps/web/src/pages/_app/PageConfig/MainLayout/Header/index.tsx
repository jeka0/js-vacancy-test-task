import { memo, FC } from 'react';
import { AppShellHeader as LayoutHeader, Container, Image } from '@mantine/core';

import { accountApi } from 'resources/account';

import { Link } from 'components';
import { RoutePath } from 'routes';

import ImageLogo from 'public/images/logo.jpg';
import UserMenu from './components/UserMenu';
import ShadowLoginBanner from './components/ShadowLoginBanner';

import classes from './index.module.css';
import Navigation from './components/Navigation';

const Header: FC<{ rout:string }> = ({ rout }) => {
  const { data: account } = accountApi.useGet();
  if (!account) return null;

  return (
    <LayoutHeader>
      {account.isShadow && <ShadowLoginBanner email={account.email} />}
      <Container
        className={classes.header}
        mih={72}
        px={32}
        py={0}
        display="flex"
        fluid
      >
        <Link type="router" href={RoutePath.Home}>
          <Image
            visibleFrom="sm"
            alt="App logo"
            src={ImageLogo.src}
            h="8vh"
            right={0}
          />
        </Link>
        <Navigation rout={rout} />
        <UserMenu />
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
