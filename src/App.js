import React, { Component } from 'react'
import './App.css'
import Map from './components/Map'
import data from './json/locations.json'

class App extends Component {
  render() {
    return (
      <div className="App">

          <Map data={data.locations}/>

      </div>
    )
  }
}

export default App
