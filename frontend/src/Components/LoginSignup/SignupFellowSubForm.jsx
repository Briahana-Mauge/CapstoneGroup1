import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SignupFellowSubForm(props) {
    const { setFeedback } = props;

    const [ cohortsList, setCohortsList ] = useState([]);

    useEffect(() => {
        const getCohortsList = async () => {
            try {
                const { data } = await axios.get(`api/cohorts`);
                setCohortsList(data.payload);
            } catch (err) {
                setFeedback(err)
            }
        }

        getCohortsList();
    }, [setFeedback]);

    return (
        <>
            <div className='col-sm-6'>
                <select className='mb-2' onChange={e => props.setCohortId(e.target.value)} value={props.cohortId}>
                    <option value={0}> -- Cohort --</option>
                    {cohortsList.map(cohort => <option key={cohort.cohort_id+cohort.cohort} value={cohort.cohort_id}>{cohort.cohort}</option>)}
                </select>
            </div>
        </>
    )
}