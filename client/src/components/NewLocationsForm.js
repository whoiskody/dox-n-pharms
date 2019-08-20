import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './NewLocationsForm.css';

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
                {/* <h2>Add New Location</h2> */}
                <div className='img'>
                    <img height="125" width="390" src ='https://i.imgur.com/t2ZF244.png'/>
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                        <div className='field'>
                           <label htmlFor='location-name'>City</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='location-name'
                            onChange={this.handleChange}
                            value={this.state.newLocation.name}
                        /> 
                        </div>
                        <div className='field'>
                            <label htmlFor='location-photo_url'>Photo URL</label>
                        <input 
                            type='text' 
                            name='photo_url' 
                            id='location-photo'
                            onChange={this.handleChange}
                            value={this.state.newLocation.photo_url}
                        />
                        </div>
                    </div>
                    <div className="button">
                        <input type='submit' value='Create' /> 
                    </div>
                   
                </form>
            </div>
        )
    }
}
