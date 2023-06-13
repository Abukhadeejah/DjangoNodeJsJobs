import { useState, createContext } from 'react';

import axios from 'axios';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [created, setCreated] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [applied, setApplied] = useState(false);
    const [stats, setStats] = useState(false);

    // Create a new job
    const newJob = async (data, access_token) => {
        try {
        setLoading(true);

        const res = await axios.post(
            `${process.env.API_URL}/api/jobs/new/`,
            data,
            {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

        if (res.data) {
            setLoading(false);
            setCreated(true);
        }
        } catch (error) {
        setLoading(false);
        setError(
            error.response &&
            (error.response.data.detail || error.response.data.error)
        );
        }
    };

    // Update a job
    const updateJob = async (id, data, access_token) => {
        try {
        setLoading(true);

        const res = await axios.put(
            `${process.env.API_URL}/api/jobs/${id}/update/`,
            data,
            {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

        if (res.data) {
            setLoading(false);
            setUpdated(true);
        }
        } catch (error) {
        setLoading(false);
        setError(
            error.response &&
            (error.response.data.detail || error.response.data.error)
        );
        }
    };



    // Apply Job
    const applyJob = async (id, access_token) => {
        try {
        setLoading(true);

        const res = await axios.post(`${process.env.API_URL}/api/jobs/${id}/apply/`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (res.data.applied === true) {
            setLoading(false);
            setApplied(true);
            }
        } catch (error) {
            setLoading(false);
            setError(
                error.response &&
                (error.response.data.detail || error.response.data.error)
        );
        }
    };

    // Check job applied
    const checkJobApplied = async (id, access_token) => {
        try {
        setLoading(true);

        const res = await axios.get(
            `${process.env.API_URL}/api/jobs/${id}/check/`,
            {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            }
        );
        
        setLoading(false);
        setApplied(res.data);

        } catch (error) {
        setLoading(false);
        setError(
            error.response &&
            (error.response.data.detail || error.response.data.error)
        );
        }
    };

    // Get Topic Stats
    const getTopicStats = async (topic) => {
        try {
        setLoading(true);

        const res = await axios.get(
            `${process.env.API_URL}/api/stats/${topic}/`,
            );

        
        setLoading(false);
        setStats(res.data);

        } catch (error) {
        setLoading(false);
        setError(
            error.response &&
            (error.response.data.detail || error.response.data.error)
        );
        }
    };



    //  Clear Errors
    const clearErrors = async () => {
        setError(null);
    };


    return (
        <JobContext.Provider
            value={{
                loading,
                error,
                created,
                updated,
                applied,
                stats,
                newJob,
                updateJob,
                getTopicStats,
                applyJob,
                setUpdated,
                checkJobApplied,
                setCreated,
                clearErrors,                
            }}
        
        >
            {children}
        
        </JobContext.Provider>
    )

}

export default JobContext;