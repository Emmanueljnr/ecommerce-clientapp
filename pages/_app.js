import React from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import { StateContext } from '../context/StateContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    //wrapping these components with the state context allow me to pass all the data from the state context directly to the entire application
    <StateContext>
      <Layout> {/*will help create a notification popup*/}
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp