import React from 'react';

const useFetchHandler = <T>() => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fetchData, setFetchData] = React.useState<T | []>([]);
  const [fetchError, setFetchError] = React.useState<string | undefined>('');

  return {
    isLoading,
    fetchData,
    fetchError,
    setIsLoading,
    setFetchData,
    setFetchError,
  };
};

export default useFetchHandler;
