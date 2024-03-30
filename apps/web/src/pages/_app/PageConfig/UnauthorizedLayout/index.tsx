import { FC, ReactElement } from 'react';

import { SimpleGrid, Image, Center } from '@mantine/core';

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
      src="https://firebasestorage.googleapis.com/v0/b/js-vacancy-test-task.appspot.com/o/img.jpg?alt=media&token=42cc44a6-fbda-4d47-b8fb-e85112bd36a8"
      h="100vh"
      right={0}
    />

  </SimpleGrid>
);

export default UnauthorizedLayout;
