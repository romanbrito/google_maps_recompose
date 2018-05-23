import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import apiKey from '../ApiKeys/apiKey.json'

const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey.googleMapsApi + '&v=3.exp&libraries=geometry,drawing,places'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: 29.7368233, lng: -95.513883}}
  >
    {props.isMarkerShown && <Marker position={{lat: 29.7368233, lng: -95.513883}}/>}
  </GoogleMap>
))

const Map = (props) => {

  return (
    <div>
      <MyMapComponent
        isMarkerShown
        googleMapURL={googleMapURL}
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `400px`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
      />
    </div>
  )
}

export default Map
