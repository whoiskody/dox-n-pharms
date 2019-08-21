import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './NewDoctorsForm.css';

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
                <div className='img'>
                    <img height="125" width="390" src ='https://i.imgur.com/p3i89oS.png'/>
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                    <div className='field'>
                        <label htmlFor='pharmacy-name'>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='pharmacy-name'
                            onChange={this.handleChange}
                            value={this.state.newPharmacy.name}
                        />
                    </div>
                        
                        <div className='field'>
                            <label htmlFor='pharmacy-contact'>Contact</label>
                        <input 
                            type='text' 
                            name='contact' 
                            id='pharmacy-contact'
                            onChange={this.handleChange}
                            value={this.state.newPharmacy.contact}
                        />
                        </div>
                        
                        <div className='field'>
                           <label htmlFor='pharmacy-address'>Address</label>
                        <input 
                            type='text' 
                            name='address' 
                            id='pharmacy-address'
                            onChange={this.handleChange}
                            value={this.state.newPharmacy.address}
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