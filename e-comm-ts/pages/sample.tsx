import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Current URL is '/'
function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/', undefined, { shallow: true });

    const query = router.query;
    console.log(Object.keys(query).length);
  }, []);

  return <div className="">1</div>;
}

export default Page;
