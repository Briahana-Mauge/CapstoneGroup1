/*
ANIME BENSALEM, BRIAHANA MAUGÉ, JOSEPH P. PASAOA
DashboardVolunteers Component | Capstone App (Pursuit Volunteer Mgr)
*/


/* IMPORTS */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EventsDashVolunteers from './EventsDash/EventsDashVolunteers';
import EventCard from '../EventCard';
import Charts from './Charts_Volunteer';
import { PrimaryModalContainer } from '../Modals/PrimaryModal';
import EventCard from '../EventCard';
// import EventRender from '../EventRender';


const DashboardVolunteers = (props) => {
  const { setFeedback, loggedUser } = props;

  const [eventsObj, setEventsObj] = useState({ upcomings: [], pasts: [], importants: [], pastData: [] });
  const [showEvent, setShowEvent] = useState(false);
  const [targetEvent, setTargetEvent] = useState({});
  const [reloadDashboard, setReloadDashboard] = useState(false);

  useEffect(() => {
    const getEventsData = async () => {
      axios.get(`/api/events/dashboard/volunteer`)
        .then(res => setEventsObj(res.data.payload))
        .catch(err => setFeedback(err));
    }
    getEventsData();
  }, [reloadDashboard, loggedUser.v_id, setFeedback]);


  const hideEvent = () => {
    setTargetEvent({});
    setShowEvent(false);
  }


  // Package drilled props
  const eventsDashProps = {
    loggedUser,
    setShowEvent,
    targetEvent,
    setTargetEvent
  }


  return (
    <>

      <div className="row">
          <div className="col-12 col-md-5">
            <EventsDashVolunteers events={eventsObj} {...eventsDashProps} />
          </div>

          <div className="col-12 col-md-7">
            <Charts chartData={eventsObj.pastData} />
          </div>
      </div>

      <PrimaryModalContainer header={targetEvent.topic || ''} hideModal={hideEvent}>
        {
          showEvent
            ? <EventCard
                loggedUser={loggedUser}
                event={targetEvent}
                setFeedback={setFeedback}
                reloadParent={reloadDashboard}
                setReloadParent={setReloadDashboard}
                // hideEvent={hideEvent}
              />
            : null
        }
      </PrimaryModalContainer>

    </>
    // {
    //   showEvent
    //     ? <EventRender
    //       loggedUser={loggedUser}
    //       event={targetEvent}
    //       setFeedback={setFeedback}
    //       reloadParent={reloadDashboard}
    //       setReloadParent={setReloadDashboard}
    //       hideEvent={hideEvent}
    //     />
    //     : null
    // }
  )
}


export default DashboardVolunteers;
