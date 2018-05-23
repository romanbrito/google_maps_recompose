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

    {props.data.map(marker => (
      <Marker
        key={marker.label}
        position={marker.coordinates}
        label={marker.label}
        onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.coordinates.lat + ',' + marker.coordinates.lng, '_blank')}
      />
    ))}

  </GoogleMap>
)

const Map = (props) => {

  return (
    <div>
      <MyMapComponent data={props.data}/>
    </div>
  )

}

export default Map