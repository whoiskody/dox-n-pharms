import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './NewDoctorsForm.css';

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
                <div className='img'>
                    <img height="125" width="390" src ='https://i.imgur.com/eivtvT8.png'/>
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <div className='form'>
                    <div className='field'>
                        <label htmlFor='doctor-name'>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='doctor-name'
                            onChange={this.handleChange}
                            value={this.state.newDoctor.name}
                        />

                    </div>
                        

                        <div className='field'>
                           <label htmlFor='doctor-contact'>Contact</label>
                        <input 
                            type='text' 
                            name='contact' 
                            id='doctor-contact'
                            onChange={this.handleChange}
                            value={this.state.newDoctor.contact}
                        /> 
                        </div>
                        

                        <div className='field'>
                            <label htmlFor='doctor-address'>Address</label>
                        <input 
                            type='text' 
                            name='address' 
                            id='doctor-address'
                            onChange={this.handleChange}
                            value={this.state.newDoctor.address}
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