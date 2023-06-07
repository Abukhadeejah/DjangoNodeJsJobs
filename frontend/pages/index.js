import Head from 'next/head';
import styles from '../styles/Home.module.css';

import axios from 'axios';

import Layout from '../components/layout/Layout';
import Home from '../components/Home';


export default function Index({ data }) {

  return (
    <Layout>
      <Home data={data}/>
    </Layout>
    
  )
}

export async function getServerSideProps({ query }) {
  const {
    jobType = '',
    education = '',
    experience = '',
    keyword = '',
    location = '',
    page = 1,
    salary = '',
  } = query;

  let min_salary = '';
  let max_salary = '';

  if (salary) {
    [min_salary, max_salary] = salary.split('-');
  }

  const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`;

  const res = await axios.get(`${process.env.API_URL}/api/jobs?${queryStr}`);

  const data = res.data;

  return {
    props: {
      data,
    },
  };
}