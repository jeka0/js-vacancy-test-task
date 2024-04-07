import { FC, ReactElement, useState, useEffect } from 'react';
import { AppShell } from '@mantine/core';
import { CartProvider } from 'pages/cart/cartContext';

import Header from './Header';

import classes from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [rout, setRout] = useState<string>('');

  useEffect(() => {
    setRout(window.location.href.split('/')[3]);
  }, [children]);

  return (
    <AppShell
      header={{ height: 72 }}
      footer={{ height: 40 }}
      classNames={{
        root: classes.root,
        main: classes.main,
      }}
    >
      <CartProvider>
        <Header rout={rout} />

        <AppShell.Main>
          {children}
        </AppShell.Main>
      </CartProvider>
    </AppShell>
  );
};

export default MainLayout;
