import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class LocationList extends Component {

    state = {
        locations: []
    }

    componentDidMount(){
        this.getAllLocations();
    }
    
    getAllLocations = () => {
        axios.get('/api/v1/locations/')
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
        let locationList = this.state.locations.map((location) => {
            return (
                <div key={location.id}>
                    <Link to={`/locations/${location.id}`}>
                        <div>
                            
                            <h2>{location.name}</h2>
                            <img height="125" width="290" src={location.photo_url} alt=''/>
                            
                        </div>
                    </Link>
                </div>
            )
        })

        return (
            <div>
                <Link to={`/new`}>
                    Add City
                </Link>
                
                   {locationList} 
                
                
            </div>
        )
    }
}
