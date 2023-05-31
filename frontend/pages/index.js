import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Layout from '../components/layout/Layout';
import Home from '../components/Home';


export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
    
  )
}
