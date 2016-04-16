'use strict';

var React = require('react-native');
var MapView = require('react-native-maps');
var {
  View,
  Component,
  StyleSheet,
  AlertIOS
} = React;

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class Maps extends Component{


  constructor(props){
    super(props);
    this.getLocation.bind(this);
  }

  render(){
    return(

      <MapView
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
        />
    );
  }

  getLat(){
    navigator.geolocation.getCurrentPosition(
      location => {
        lat = location.coords.latitude;
        console.log(lat);
        long = location.coords.longitude;
        return lat;
      },
      error => {
        AlertIOS.alert('error getting location');

      }
    )
  }

  getLong(){
    navigator.geolocation.getCurrentPosition(
      location => {
        lat = location.coords.latitude;
        long = location.coords.longitude;
        console.log(long);
        return long;
      },
      error => {
        AlertIOS.alert('error getting location');

      }
    )
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(
      location => {
        lat = location.coords.latitude;
        long = location.coords.longitude;

      },
      error => {
        AlertIOS.alert('error getting location');

      }
    )
  }
};

module.exports = Maps
