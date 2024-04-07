import { FC, ReactElement } from 'react';

import { SimpleGrid, Image, Center } from '@mantine/core';
import ImageAuth from 'public/images/auth.png';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid
    cols={{ base: 1, sm: 2 }}
    spacing="sm"
  >
    <Center px={32} w="100%" h="100vh" component="main">
      {children}
    </Center>
    <Image
      visibleFrom="sm"
      alt="App Info"
      src={ImageAuth.src}
      h="100vh"
      right={0}
      style={{ objectFit: 'contain' }}
    />

  </SimpleGrid>
);

export default UnauthorizedLayout;
