import React, {Component} from 'react'
// import './Search.css'
import {Grid, Col, Row} from 'react-bootstrap'
// import Menus from './Menus'

class SearchLocation extends Component {
  state = {
    search: '',
    currentPosition: null,
    locations: this.props.data,
    isGeoSorted: false
  }



  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
          this.setState({currentPosition: {lat: position.coords.latitude, lng: position.coords.longitude}}),
        () => console.log('error'))
    }
  }

  render() {

    const locations = this.props.data
    const reExp = new RegExp(this.state.search, "i")

    return (

      <Col sm={6}>
        {locations.length > 1 ?

          <Row id="search-area">
            <input
              id="search-input"
              type="search"
              className="input-search fontAwesome"
              name="search"
              placeholder="Name, City, State     &#xF002;"
              value={this.state.search}
              onChange={(e) => this.setState({search: e.target.value})}
            />
            <hr/>
          </Row>

          :''}

        {this.state.currentPosition && !this.state.isGeoSorted && this._distanceMatrix([this.state.currentPosition], locations, this.props.distanceMatrixService)}

        <Grid fluid>
          <div id="update" className="search-location">

            <ul className="searchresults">
              {
                this.state.locations.filter(location =>
                  location.name.search(reExp) !== -1 ||
                  location.address.search(reExp) !== -1 ||
                  location.zip.search(reExp) !== -1 ||
                  location.state.search(reExp) !== -1 ||
                  location.city.search(reExp) !== -1
                )
                  .map(list =>

                    <li key={list.label}>
                      <Row className="main-location">
                        <Col lg={6} className="location-info">
                          <h4>{list.name}</h4>
                          <p>{list.address}</p>
                          <p>{list.city} {list.state} {list.zip} </p>
                          <a href="tel: + {list.phone}"> T. {list.phone}</a>
                          <p>{list.hours1}</p>
                          <p>{list.hours2}</p>
                          <p>{list.hours3}</p>
                          {list.miles && <p>Distance: {list.miles} miles</p>}
                        </Col>

                        {/*<Menus*/}
                          {/*list={list}/>*/}


                      </Row>
                    </li>
                  )}
            </ul>
          </div>
        </Grid>
      </Col>

    )
  }

  _distanceMatrix = (origins, locations, distanceMatrixService) => {
    const service = distanceMatrixService()

    const destinations = locations.map(location => location.coordinates)
    // prop form map

    service.getDistanceMatrix({
      origins: origins,
      destinations: destinations,
      travelMode: 'DRIVING',
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, (response, status) => {
      if (status === 'OK') {
        const distance = response.rows[0].elements

        // merging distance with locations array
        const location_distance = distance.map( (element, index) => {
          locations[index].distance = element.distance.value;
          locations[index].miles = element.distance.text;
          return locations[index];
        }).sort((a, b) => {  // sorting locations array
          return a.distance - b.distance;
        })

        this.setState({locations: location_distance, isGeoSorted: true})

      } else {
        console.log('Geocode was not successful due to: ' + status);
      }
    })

  }

}

export default SearchLocation