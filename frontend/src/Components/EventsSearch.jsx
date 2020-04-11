import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import EventsSearchCard from './EventsSearchCard';
import { Link, Route, Switch } from 'react-router-dom';

//Class component
class EventSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            search: '',
            loading: true,
            results: [],
            filter: '',
            submitted: false
        }
    }
    componentDidMount = () => {

        this.getAllEvents();
    }

    getAllEvents = async () => {

        let { filter, search } = this.state
        let basic = ''
        if (filter === '') {
            basic = await axios.get(`/api/events/all/`);

        } else if (filter === 'v_email') {
            basic = await axios.get(`/api/events/all/?v_email=${search}`);

        } else if (filter === 'company') {
            basic = await axios.get(`/api/events/all/?company=${search}`);

        }
        else if (filter === 'skill') {
            basic = await axios.get(`/api/events/all/?skill=${search}`);

        } else {
            basic = await axios.get(`/api/events/all/?name=${search}`);
        }


        this.setState({
            results: basic.data.payload
        })
    }

    handleInput = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
            loading: true
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            loading: false,
        })

        this.getAllEvents();


    }
    render = () => {

        const { results } = this.state
        return (
            <div className="Search">
        
                <form>
                    <input type='text' name='search' placeholder='Search' onChange={this.handleInput} value={this.setState.search} />
                    <input type='button' value='Send' onClick={this.handleSubmit} />
                    <select className='filter' name='filter' onChange={this.handleInput}>
                        <option value={false} key='null'>Choose a search filter</option>
                        <option value='name' key='name'>Name</option>
                        <option value='v_email' key='v_email'>Email</option>
                        <option value='company' key='company'>Company</option>
                        <option value='skill' key='skills'>Skill</option>
                    </select>
                </form>
                <div>
                    {results.map(volunteer => {
                        return (

                            <div key={volunteer.v_id}>
                                {/* <VolunteerSearchCard volunteer={volunteer} /> */}

                            </div>

                        )
                    })}
                </div>


            </div>
        );
    }
}

export default EventSearch;