import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Location extends Component {
    state = {
        location: {
            doctors: [],
            pharmacies: [] 
        },
        
    }

    componentDidMount(){
        this.getLocation();
    }

    getLocation = () => {
        axios.get(`/api/v1/locations/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    location: res.data,
                    doctors: res.data.doctors,
                    pharmacies: res.data.pharmacies
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
        const copiedLocation = {...this.state.location}
        copiedLocation[event.target.name] = event.target.value
        this.setState({location: copiedLocation})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/v1/locations/${this.state.location.id}/`, this.state.location)
            .then((res) => {
                this.setState({
                    location: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    handleDeleteLocation = () => {
        axios.delete(`/api/v1/locations/${this.state.location.id}/`)
        .then(() => {
            this.setState({redirectToHome: true})
        })
    }

    

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        let doctorList = this.state.location.doctors.map((doctor) => {
            return (
                <div key={doctor.id}>
                    <Link to={`/doctors/${doctor.id}`}>
                        <div key={doctor.id}>
                        <p>{doctor.name}</p>
                        <img height="200" width="200" src={doctor.photo_url} alt=''/>
                        </div>
                    </Link>
                </div>
            )
        })

        let pharmacyList = this.state.location.pharmacies.map((pharmacy) => {
            return (
                <div key={pharmacy.id}>
                    <Link to={`/pharmacies/${pharmacy.id}`}>
                        <div key={pharmacy.id}>
                            <p>{pharmacy.name}</p>
                            <img height="150" width="290" src={pharmacy.photo_url} alt=''/>
                        </div>
                    </Link>
                </div>
            )
        })

        return (
            <div>
                {this.state.isEditFormDisplayed
                ? <form onSubmit={this.handleSubmit}>
                    <div className= "locationName" >
                        <label htmlFor="location-name">City</label>
                    <input 
                            type='text' 
                            name='name' 
                            id='location-name'
                            onChange={this.handleInputChange}
                            value={this.state.location.name}
                        />

                        <label htmlFor='location-photo_url'>Photo URL</label>
                        <input 
                            type='text' 
                            name='photo_url' 
                            id='location-photo'
                            onChange={this.handleInputChange}
                            value={this.state.location.photo_url}
                        />
                    </div>
                    <div className= "updateLocation" >
                       <input type="submit" value="Update Location"/> 
                    </div>
                    </form>
            :<div>
                 <button onClick={this.handleToggleEditForm}>Edit City</button>
                 <button onClick={this.handleDeleteLocation}>Delete City</button>
                 </div>
            }
                 <div class="video-container">
                    <iframe width="1278" height="350"
                        src="https://www.youtube.com/embed/gPVde5-CKFw?autoplay=1" allow='autoplay' frameborder="0">
                    </iframe> 
                </div>
                <h1>{this.state.location.name}</h1>
                <h3>Doctors</h3>
                <Link to={`/locations/${this.props.match.params.id}/doctors/new`}>
                    Add Doctor
                </Link>
                {doctorList}
                <h3>Pharmacies</h3>
                <Link to={`/locations/${this.props.match.params.id}/pharmacies/new`}>
                    Add Pharmacy
                </Link>
                {pharmacyList}
            </div>
        )
    }
}

