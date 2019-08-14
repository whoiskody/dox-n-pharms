import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {

    state = {
        location: []
    }

    componentDidMount(){
        this.getAllLocations();
    }
    
    getAllLocations = () => {
        axios.get('/api/v1/location/')
            .then(res => {
                this.setState({
                    locations: res.data
                });
            })
            .catch(err => {
                console.log(err)
            })
      }

    render() {
        let locationList = this.state.location.map((location) => {
            return (
                <Link to={`/location/${location.id}`}>
                <div>
                    <h2>{location.name}</h2>
                    <img src={location.photo_url} alt=''/>
                    
                </div>
                </Link>
                
            )
        })

        return (
            <div>
                {locationList}
            </div>
        )
    }
}
