import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../components/Layout'));

const Contacts: React.FC = (): JSX.Element => {
  return <Layout title="contacts">contacts</Layout>;
};

export default Contacts;
