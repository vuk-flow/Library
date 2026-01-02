import { useRouter } from 'next/router';
import { useEffect } from 'react';

const App = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/libraries');
  }, [router]);
};

export default App;
