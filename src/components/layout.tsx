import { Fragment } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <main
      // style={{
      //   variant: 'layout.main',
      // }}
      >
        {children}
      </main>
      <Footer />
    </Fragment>
  );
}
