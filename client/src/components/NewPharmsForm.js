import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class NewPharmsForm extends Component {
    state = {
        newPharmacy: {
            name: '',
            contact: '',
            address: '',
            location: this.props.match.params.id
        },
        redirectToHome: false
    }

    handleChange = (evt) => {
        let copiedPharmacy = {...this.state.newPharmacy}
        
        copiedPharmacy[evt.target.name]  = evt.target.value

        this.setState({
            newPharmacy: copiedPharmacy
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post('/api/v1/pharmacies/', this.state.newPharmacy)
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
                <h2>Add New Pharmacy</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='pharmacy-name'>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='pharmacy-name'
                            onChange={this.handleChange}
                            value={this.state.newPharmacy.name}
                        />

                        <label htmlFor='pharmacy-contact'>Contact</label>
                        <input 
                            type='text' 
                            name='contact' 
                            id='pharmacy-contact'
                            onChange={this.handleChange}
                            value={this.state.newPharmacy.contact}
                        />

                        <label htmlFor='pharmacy-address'>Address</label>
                        <input 
                            type='text' 
                            name='address' 
                            id='pharmacy-address'
                            onChange={this.handleChange}
                            value={this.state.newPharmacy.address}
                        />

                    </div>
                    <input type='submit' value='Create' />
                </form>
            </div>
        )
    }
}