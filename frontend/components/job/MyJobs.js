import React, { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import DataTable from 'react-data-table-component';

import JobContext from "../../context/JobContext";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

const MyJobs = ({ jobs, access_token }) => {
  const { clearErrors, error, loading, deleted, deleteJob, setDeleted } =
    useContext(JobContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (deleted) {
      setDeleted(false);
      router.push(router.asPath);
    }
  }, [error, deleted]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }


  const columns = [
    {
      name: 'Job ID',
      sortable: true,
      selector: (row) => row.id,
      },
    {
    name: 'Job name',
    sortable: true,
    selector: (row) => row.title,
    },
    {
      name: 'Salary',
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: 'Actions',
      sortable: true,
      selector: (row) => row.actions,
    },
  ];

  const data = [];
 
  console.log(jobs)
  jobs && jobs.forEach((job) => {
    data.push({
        id: job.id,
        title: job.title,
        salary: job.salary,
        actions: (
            <>
                <Link 
                    className='btn btn-primary'
                    href={`/jobs/${job.id}`}
                >
                    <i aria-hidden className='fa fa-eye'></i>           
                </Link>
                <Link 
                    className='btn btn-success my-2 mx-1'
                    href={`/employer/jobs/candidates/${job.id}`}
                >
                    <i aria-hidden className='fa fa-users'></i>           
                </Link>
                <Link 
                    className='btn btn-warning my-2 mx-1'
                    href={`/employer/jobs/${job.id}`}
                >
                    <i aria-hidden className='fa fa-pencil'></i>           
                </Link>
                <button className='btn btn-danger mx-1'>
                    <i className='fa fa-trash'></i>

                </button>
            </>
        )
        })
  })

  return (
    <div className='row'>
      <div className='col-2'></div>
      <div className='col-8 mt-5'>
        <h4 className='my-5'>My Jobs</h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className='col-2'></div>

    </div>
  )
}

export default MyJobs