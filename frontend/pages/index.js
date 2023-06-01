import Head from 'next/head';
import styles from '../styles/Home.module.css';

import axios from 'axios';

import Layout from '../components/layout/Layout';
import Home from '../components/Home';


export default function Index({ data }) {

  console.log('jobs', data);
  return (
    <Layout>
      <Home />
    </Layout>
    
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.API_URL}/api/jobs/`)

  const data = res.data;

  return {
    props: {
      data,
    }
  }
}
