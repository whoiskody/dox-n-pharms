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

    

    render() {
        let doctorList = this.state.location.doctors.map((doctor) => {
            return (
                <Link to={`/doctor/${doctor.id}`}>
                    <div key={doctor.id}>
                    <p>{doctor.name}</p>
                    </div>
                </Link>
                
            )
        })

        let pharmacyList = this.state.location.pharmacies.map((pharmacy) => {
            return (
                <Link to={`/pharmacy${pharmacy.id}`}>
                    <div key={pharmacy.id}>
                        <p>{pharmacy.name}</p>
                    </div>
                </Link>
                
            )
        })

        return (
            <div>
                <h1>{this.state.location.name}</h1>
                <h3>Doctors</h3>
                {doctorList}
                <h3>Pharmacies</h3>
                {pharmacyList}
            </div>
        )
    }
}
