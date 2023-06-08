import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [applied, setApplied] = useState(false);
    const [stats, setStats] = useState(false);

    const router = useRouter();

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
                updated,
                applied,
                stats,
                getTopicStats,
                applyJob,
                setUpdated,
                checkJobApplied,
                clearErrors,                
            }}
        
        >
            {children}
        
        </JobContext.Provider>
    )

}

export default JobContext;