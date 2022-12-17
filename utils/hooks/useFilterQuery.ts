import { useRouter } from 'next/router';

const useFilterQuery = () => {
  const router = useRouter();
  const filterQuery = (queryOpts: Record<string, string | string[]>) => {
    const path = router.pathname;
    const currentQuery = router.query;

    setTimeout(() => {
      router.push({
        // TODO: push without scrolling to top https://stackoverflow.com/questions/65902664/next-js-router-push-without-scrolling-to-the-top
        pathname: path,
        query: { ...currentQuery, ...queryOpts },
      });
    }, 0.5);
  };

  return { filterQuery };
};

export default useFilterQuery;
