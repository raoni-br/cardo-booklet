import Head from 'next/head';
import Header from '../header/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Cardo Booklet App</title>
      </Head>
      <Header />
      <main className="container">{children}</main>
    </>
  );
}
