import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class NewLocationsForm extends Component {
    state = {
        newLocation: {
            name: '',
            photo_url: ''
        },
        redirectToHome: false
    }

    handleChange = (evt) => {
        let copiedLocation = {...this.state.newLocation}
        
        copiedLocation[evt.target.name]  = evt.target.value

        this.setState({
            newLocation: copiedLocation
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post('/api/v1/locations/', this.state.newLocation)
        .then(() => {
            this.setState({
                redirectToHome: true
            })
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h2>Add New Location</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='location-name'>City</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='location-name'
                            onChange={this.handleChange}
                            value={this.state.newLocation.name}
                        />

                        <label htmlFor='location-photo_url'>Photo URL</label>
                        <input 
                            type='text' 
                            name='photo_url' 
                            id='location-photo'
                            onChange={this.handleChange}
                            value={this.state.newLocation.photo_url}
                        />
                    </div>
                    <input type='submit' value='Create' />
                </form>
            </div>
        )
    }
}
