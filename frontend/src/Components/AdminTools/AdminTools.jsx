import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import AdminToolsTabs from './AdminToolsTabs';
import UsersTab from './UsersTab';
import CohortsTab from './CohortsTab';
import SkillsTab from './SkillsTab';


export default function AdminTools(props) {
    const path = useLocation().pathname.split('/');
    const history = useHistory();

    let tab = '';
    if (path[2]) {
        tab = path[2];
    } else {
        history.push('tools/skills');
    }

    return (
        <>
            <AdminToolsTabs 
                skillsTab={tab === 'skills' ? 'active' : ''}
                cohortsTab={tab === 'cohorts' ? 'active' : ''}
                usersTab={tab === 'users' ? 'active' : ''}
            />

            {
                tab === 'skills'
                ? <SkillsTab setFeedback={props.setFeedback} />
                : null
            }

            {
                tab === 'cohorts'
                ? <CohortsTab setFeedback={props.setFeedback} />
                : null
            }

            {
                tab === 'users'
                ? <UsersTab setFeedback={props.setFeedback} />
                : null
            }

        </>
    )
}