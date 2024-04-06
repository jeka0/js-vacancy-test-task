import { useLayoutEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const Home: NextPage = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push('/marketplace');
  }, [router]);
  return (
    <div>
      loading...
    </div>
  );
};

export default Home;
