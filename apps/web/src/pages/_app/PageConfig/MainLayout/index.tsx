import { FC, ReactElement, useState, useEffect } from 'react';
import { AppShell } from '@mantine/core';

import Header from './Header';
import Footer from './Footer';

import classes from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [rout, setRout] = useState<string>('');

  useEffect(() => {
    setRout(window.location.href.split('/')[3]);
  }, []);

  return (
    <AppShell
      header={{ height: 72 }}
      footer={{ height: 40 }}
      classNames={{
        root: classes.root,
        main: classes.main,
      }}
    >
      <Header rout={rout} />

      <AppShell.Main>
        {children}
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
};

export default MainLayout;
