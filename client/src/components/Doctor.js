import React, { Component } from 'react'
import axios from 'axios';

export default class Doctor extends Component {
    state = {
        doctor: {}

    }

    componentDidMount(){
        this.getDoctor();
    }

    getDoctor = () => {
        axios.get(`/api/v1/doctors/${this.props.match.params.id}`)
            .then((res) => {
                this.setState({
                    doctor: res.data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h1>{this.state.doctor.name}</h1>
            </div>
        )
    }
}
