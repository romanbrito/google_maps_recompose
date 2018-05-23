import React from 'react'
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import apiKey from '../ApiKeys/apiKey.json'

const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey.googleMapsApi + '&v=3.exp&libraries=geometry,drawing,places'

const MyMapComponent = compose(
  withProps({
    googleMapURL: googleMapURL,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: 29.7368233, lng: -95.513883}}
  >
    {props.isMarkerShown && <Marker position={{lat: 29.7368233, lng: -95.513883}}/>}
  </GoogleMap>
)

const Map = (props) => {
  return (
    <div>
      <MyMapComponent
        isMarkerShown
      />
    </div>
  )

}

export default Map