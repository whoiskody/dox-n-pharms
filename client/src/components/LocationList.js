import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LocationList.css';

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
                
                    <Link 
                        key={location.id}
                        to={`/locations/${location.id}`}
                        className="location-card"
                    >
                        <div className="ui card">
                            <div className="content">
                                <h2>{location.name}</h2>
                            </div>
                            <div className="image">
                                <img height="125" width="290" src={location.photo_url} alt=''/>
                            </div>
                        </div>
                    </Link>
                
            )
        })

        return (
            <div>
                <div class="video-container">
                    <iframe width="1278" height="350"
                        src="https://www.youtube.com/embed/U3_uxUSeZV4?autoplay=1" allow='autoplay' frameborder="0">
                    </iframe> 
                </div>
                
                <h1>Locations</h1>
                <p>*Choose Or Add Your City*</p>
                <div className='add'>
                    <Link to={`/new`}>
                    Add City +
                </Link>
                </div>
                
                   {locationList} 

            </div>
        )
    }
}
