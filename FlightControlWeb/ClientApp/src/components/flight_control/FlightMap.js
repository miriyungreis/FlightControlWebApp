import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
//import * as parkData from "./data/skateboard-parks.json";
import "./FlightMap.css";


export default class FlightMap extends Component {



    render() {
        return (
            <Map center={[45.4, -75.7]} zoom={2}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        );
    }
}


