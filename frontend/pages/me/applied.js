import Layout from '../../components/layout/Layout';
// import UpdateProfile from '../../components/user/UpdateProfile';
import axios from 'axios';

import { isAuthenticatedUser } from '../../utils/isAuthenticated';


export default function JobsAppliedPage({ jobs }) {
    console.log(jobs)

  return (
    <Layout title="Jobs Applied">
      <h1>Jobs Applied</h1>
    </Layout>
    
  )
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access;

  const user = await isAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/applied/`, {
    headers: {
        Authorization: `Bearer ${access_token}`
    }
  })

  const jobs = res.data

  return {
    props: {
      jobs,
    },
  };
}