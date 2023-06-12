import React, { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import DataTable from 'react-data-table-component';

import JobContext from "../../context/JobContext";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

const JobCandidates = ({ candidatesApplied }) => {
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
    name: 'Job Name',
    sortable: true,
    selector: (row) => row.title,
    },
    {
      name: 'User ID',
      sortable: true,
      selector: (row) => row.id,
      },

    {
      name: 'Candidate Resume',
      sortable: true,
      selector: (row) => row.resume,
    },
    {
      name: 'Applied On',
      sortable: true,
      selector: (row) => row.appliedOn,
    },
  ];

  const data = [];
 

  candidatesApplied && candidatesApplied.forEach((item) => {
    data.push({
        title: item.job.title,
        id: item.user,
        resume: (
            <>
                <a
                    href={`https://appopoleisjobs.s3.amazonaws.com/${item.resume}`}
                    className="text-success text-center ml-4"
                    rel="noreferrer"
                    target="_blank"
                    >
                    <b>
                        <i aria-hidden className="fas fa-download"></i> View Resume
                    </b>
                </a>
            </>
        ),
        appliedOn: item.appliedOn.substring(0, 10),
        })
  })

  return (
    <div className='row'>
      <div className='col-2'></div>
      <div className='col-8 mt-5'>
        <h4 className='my-5'>
            {candidatesApplied && candidatesApplied.length === 1
                ? '1 Candidate has applied to this job'
                : `${candidatesApplied.length} Candidates have applied to this job`}
        </h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className='col-2'></div>

    </div>
  )
}

export default JobCandidates;