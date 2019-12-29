import React, { Component } from 'react';
//import GoogleMapReact from 'google-map-react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { withSnackbar } from 'notistack';



const provider = new OpenStreetMapProvider();
 
class SimpleMap extends Component {

  constructor(props){
    super(props);

    this.state = {
      x: null,                      // lon,
      y: null,                      // lat,
      label: '',                  // formatted address
      bounds: [
        [0, 0],             // s, w - lat, lon
        [0, 0],             // n, e - lat, lon
      ],
      raw: {},                        // raw provider result
      zoom: 15,
    }

  }
 
  handleClose = () =>{
    this.setState({
      notify: false
    });
  }

  componentDidMount(){
    provider.search({ query: this.props.query }).then(res => { 
      if(res.length > 1){
        this.props.enqueueSnackbar('Attenzione l\'indirizzo potrebbe essere incompleto');

      }
      this.setState({
        x: res[0].x,                      // lon,
        y: res[0].y,                      // lat,
        label: res[0].label,                  // formatted address
        bounds: res[0].bounds,
        raw: res[0].raw,
      });
    });

  }

  render() {
    //https://nominatim.openstreetmap.org/search?format=json&q=__STREET_

    if(this.state.x != null && this.state.y != null){ console.log([this.state.y, this.state.x]);
      return (
        <Map center={[this.state.y, this.state.x]} zoom={this.state.zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[this.state.y, this.state.x]}>
            <Popup>{this.props.label}</Popup>
          </Marker>
        </Map>
      );
    }else{
      return "";
    }
  }
}
 
export default withSnackbar(SimpleMap);