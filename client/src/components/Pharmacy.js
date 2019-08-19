import React, { Component } from 'react';
import axios from 'axios';

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

    render() {
        return (
            <div>
                <h1>{this.state.pharmacy.name}</h1>
                <p>hello again</p>
            </div>
        )
    }
}
