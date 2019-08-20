import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Doctor.css';

export default class Doctor extends Component {
    state = {
        doctor: {}

    }

    componentDidMount(){
        this.getDoctor();
    }

    getDoctor = () => {
        axios.get(`/api/v1/doctors/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    doctor: res.data,
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
        const copiedDoctor = {...this.state.doctor}
        copiedDoctor[event.target.name] = event.target.value
        this.setState({doctor: copiedDoctor})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/v1/doctors/${this.state.doctor.id}/`, this.state.doctor)
            .then((res) => {
                this.setState({
                    doctor: res.data,
                    isEditFormDisplayed: false
                })
            })
    }

    handleDeleteDoctor = () => {
        axios.delete(`/api/v1/doctors/${this.state.doctor.id}/`)
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
                    <div className= "doctorName" >
                        <label htmlFor="doctor-name">Name</label>
                    <input 
                            type='text' 
                            name='name' 
                            id='doctor-name'
                            onChange={this.handleInputChange}
                            value={this.state.doctor.name}
                        />

                        <label htmlFor='doctor-photo_url'>Photo URL</label>
                        <input 
                            type='text' 
                            name='photo_url' 
                            id='doctor-photo'
                            onChange={this.handleInputChange}
                            value={this.state.doctor.photo_url}
                        />
                    </div>
                    <div className= "updateDoctor" >
                       <input type="submit" value="Update Doctor"/> 
                    </div>
                    </form>
            :<div className='edit'>
                 <button onClick={this.handleToggleEditForm}>Edit Doctor</button>
                 <button onClick={this.handleDeleteDoctor}>Delete Doctor</button>
                 </div>
            }
                 <div class="video-container">
                    <iframe width="1278" height="350"
                        src="https://www.youtube.com/embed/HEjocL2b1yc?autoplay=1" allow='autoplay' frameborder="0">
                    </iframe> 
                </div>
                <h1>{this.state.doctor.name}</h1>
                <p>hello</p>
            
            </div>
        )
    }
}