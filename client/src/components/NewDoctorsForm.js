import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class NewDoctorsForm extends Component {
    state = {
        newDoctor: {
            name: '',
            contact: '',
            address: '',
            location: this.props.match.params.id
        },
        redirectToHome: false
    }

    handleChange = (evt) => {
        let copiedDoctor = {...this.state.newDoctor}
        
        copiedDoctor[evt.target.name]  = evt.target.value

        this.setState({
            newDoctor: copiedDoctor
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post('/api/v1/doctors/', this.state.newDoctor)
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
                <h2>Add New Doctor</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='doctor-name'>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='doctor-name'
                            onChange={this.handleChange}
                            value={this.state.newDoctor.name}
                        />

                        <label htmlFor='doctor-contact'>Contact</label>
                        <input 
                            type='text' 
                            name='contact' 
                            id='doctor-contact'
                            onChange={this.handleChange}
                            value={this.state.newDoctor.contact}
                        />

                        <label htmlFor='doctor-address'>Address</label>
                        <input 
                            type='text' 
                            name='address' 
                            id='doctor-address'
                            onChange={this.handleChange}
                            value={this.state.newDoctor.address}
                        />

                    </div>
                    <input type='submit' value='Create' />
                </form>
            </div>
        )
    }
}