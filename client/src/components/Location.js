import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

        axios.put(`/api/v1/locations/${this.state.location.id}`)
            .then((res) => {
                this.setState({
                    location: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    

    render() {
        let doctorList = this.state.location.doctors.map((doctor) => {
            return (
                <div key={doctor.id}>
                    <Link to={`/doctor/${doctor.id}`}>
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
                    <Link to={`/pharmacy${pharmacy.id}`}>
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
                        type="text" 
                        id="location-name" 
                        name="name" 
                        onChange={this.handleInputChange}
                        value={this.state.location.name}
                    />
                    </div>
                    <div className= "updateLocation" >
                       <input type="submit" value="Update Location"/> 
                    </div>
                    </form>
            :<div>
                 <button onClick={this.handleToggleEditForm}>Edit Shop</button>
                 </div>
            }
                <h1>{this.state.location.name}</h1>
                <h3>Doctors</h3>
                {doctorList}
                <h3>Pharmacies</h3>
                {pharmacyList}
            </div>
        )
    }
}
