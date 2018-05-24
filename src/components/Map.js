import React from 'react'
import {compose, withProps, lifecycle, withHandlers} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer'
import apiKey from '../ApiKeys/apiKey.json'
import SearchLocation from './SearchLocation'

const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey.googleMapsApi + '&v=3.exp&libraries=geometry,drawing,places'

const MyMapComponent = compose(
  withProps({
    googleMapURL: googleMapURL,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  lifecycle({
    componentWillMount() {
      const {data} = this.props

      this.setState({

        zoomToMarkers: map => {
          const bounds = new window.google.maps.LatLngBounds()

          for (let i = 0; i < data.length; i++) {
            const loc = new window.google.maps.LatLng(data[i].coordinates)
            bounds.extend(loc)
          }

          map.fitBounds(bounds)

        },
        distanceMatrixService: () => {
          return new window.google.maps.DistanceMatrixService()
        }
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <div>
    <GoogleMap
      ref={props.zoomToMarkers}
      defaultZoom={8}
      defaultCenter={{lat: 29.7368233, lng: -95.513883}}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={15}
      >

        {props.data.map(marker => (
          <Marker
            key={marker.label}
            position={marker.coordinates}
            label={marker.label}
            onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.coordinates.lat + ',' + marker.coordinates.lng, '_blank')}
          />
        ))}

      </MarkerClusterer>
    </GoogleMap>
    <div>
      <SearchLocation data={props.data} distanceMatrixService={props.distanceMatrixService}/>
    </div>
  </div>
)

const Map = (props) => {

  return (
    <MyMapComponent data={props.data}/>
  )

}

export default Map