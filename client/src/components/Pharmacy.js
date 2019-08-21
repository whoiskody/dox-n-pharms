import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Pharmacy.css';

export default class Pharmacy extends Component {
    state = {
        pharmacy: {}

    }

    componentDidMount(){
        this.getPharmacy();
    }

    getPharmacy = () => {
        axios.get(`/api/v1/pharmacies/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    pharmacy: res.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleInputChange = (event) => {
        const copiedPharmacy = {...this.state.pharmacy}
        copiedPharmacy[event.target.name] = event.target.value
        this.setState({pharmacy: copiedPharmacy})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/v1/pharmacies/${this.state.pharmacy.id}/`, this.state.pharmacy)
            .then((res) => {
                this.setState({
                    pharmacy: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    handleDeletePharmacy = () => {
        axios.delete(`/api/v1/pharmacies/${this.state.pharmacy.id}/`)
        .then(() => {
            this.setState({redirectToHome: true})
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                {this.state.isEditFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <div className= "pharmacyName" >
                        <label htmlFor="pharmacy-name">Name</label>
                    <input 
                            type='text' 
                            name='name' 
                            id='pharmacy-name'
                            onChange={this.handleInputChange}
                            value={this.state.pharmacy.name}
                        />

                        <label htmlFor='pharmacy-contact'>Contact</label>
                        <input 
                            type='text' 
                            name='contact' 
                            id='pharmacy-contact'
                            onChange={this.handleInputChange}
                            value={this.state.pharmacy.contact}
                        />

                        <label htmlFor='pharmacy-address'>Address</label>
                        <input 
                            type='text' 
                            name='address' 
                            id='pharmacy-address'
                            onChange={this.handleInputChange}
                            value={this.state.pharmacy.address}
                        />
                    </div>
                    <div className= "updatePharmacy" >
                       <input type="submit" value="Update Pharmacy"/> 
                    </div>
                    </form>
            :<div className='edit'>
                 <button onClick={this.handleToggleEditForm}>Edit Pharmacy</button>
                 <button onClick={this.handleDeletePharmacy}>Delete Pharmacy</button>
                 </div>
            }
                 <div class="video-container">
                    <iframe width="1278" height="350"
                        src="https://www.youtube.com/embed/IW-LFyfuuhs?autoplay=1" allow='autoplay' frameborder="0">
                    </iframe> 
                </div>
                <h1>{this.state.pharmacy.name}</h1>
                <p>{this.state.pharmacy.contact}</p>
                <p>{this.state.pharmacy.address}</p>
            
            </div>
        )
    }
}
