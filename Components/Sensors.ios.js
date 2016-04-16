'use strict';

var React = require('react-native');
var TouchID = require('react-native-touch-id');
var {DeviceEventEmitter} = React;

var {
    Accelerometer,
    Gyroscope,
    Magnetometer
} = require('NativeModules');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Component,
  AlertIOS, // Thanks Kent!
  VibrationIOS,
  Dimensions,
  NavigatorIOS,
  Image,
  PixelRatio,
  DeviceEventEmitter,
  NativeModules: {
   ImagePickerManager
 }
} = React;

var accelerometerStarted = false;
var gyroscopeStarted = false;
var magnetoMeter = false;

class Sensors extends Component {

  constructor(props){
    super(props);
    this.state = {
       avatarSource: null,
       videoSource: null,
       dataX: '',
       dataY: '',
       dataZ: ''
     };
  }


  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight style={styles.button}
            onPress={this.showLocation}>
            <Text style={styles.buttonText}>Location</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useAccelerator.bind(this)}>
            <Text style={styles.buttonText}>Accelerometer</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useGyroscope.bind(this)}>
            <Text style={styles.buttonText}>Gyroscope</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useMagnetoMeter.bind(this)}>
            <Text style={styles.buttonText}>Magnetometer</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useTouchId}>
            <Text style={styles.buttonText}>TouchID</Text>
          </TouchableHighlight>
          <Text style={styles.text} numberOfLines={3}>
            { this.state.dataX + '\n'}
            { this.state.dataY + '\n'}
            { this.state.dataZ}
          </Text>
      </View>
    );
  }

  useAccelerator(){
    if(accelerometerStarted == false){
      Accelerometer.setAccelerometerUpdateInterval(0.1); // in seconds
      DeviceEventEmitter.addListener('AccelerationData', function (data) {

        this.setState({
          dataX: 'Accelerometer X:' + data.acceleration.x,
          dataY: 'Accelerometer Y:' + data.acceleration.y,
          dataZ: 'Accelerometer Z:' + data.acceleration.z

        });

      }.bind(this));
      Accelerometer.startAccelerometerUpdates();
      accelerometerStarted = true;
    } else{
      Accelerometer.stopAccelerometerUpdates();
      accelerometerStarted = false;
      this.setState({
        dataX: '',
        dataY: '',
        dataZ: ''

      });
    }
  }

  useGyroscope(){
    if(gyroscopeStarted == false){
      Gyroscope.setGyroUpdateInterval(0.1); // in seconds
      DeviceEventEmitter.addListener('GyroData', function (data) {

        this.setState({
          dataX: 'Gyroscope X:' + data.rotationRate.x,
          dataY: 'Gyroscope Y:' + data.rotationRate.y,
          dataZ: 'Gyroscope Z:' + data.rotationRate.z

        });
      }.bind(this));
      Gyroscope.startGyroUpdates();
      gyroscopeStarted = true;
    } else{
      Gyroscope.stopGyroUpdates();
      gyroscopeStarted = false;
      this.setState({
        dataX: '',
        dataY: '',
        dataZ: ''

      });
    }
  }

  useMagnetoMeter(){
    if(magnetoMeter == false){

      Magnetometer.setMagnetometerUpdateInterval(0.1); // in seconds
      DeviceEventEmitter.addListener('MagnetometerData', function (data) {

        this.setState({
          dataX: 'Magnetometer X:' + data.magneticField.x,
          dataY: 'Magnetometer Y:' + data.magneticField.y,
          dataZ: 'Magnetometer Z:' + data.magneticField.z

        });

      }.bind(this));
      Magnetometer.startMagnetometerUpdates();
      magnetoMeter = true;
    } else{
      Magnetometer.stopMagnetometerUpdates();
      magnetoMeter = false;
      this.setState({
        dataX: '',
        dataY: '',
        dataZ: ''

      });
    }
  }

  useTouchId(){
    TouchID.authenticate('to demo this react-native component')
      .then(success => {
        AlertIOS.alert('Authenticated Successfully');
      })
      .catch(error => {
        AlertIOS.alert('Authentication Failed');
      });

  }


  showLocation(){
    navigator.geolocation.getCurrentPosition(
      location => {
        var lat = location.coords.latitude;
        var long = location.coords.longitude;
        AlertIOS.alert('GPS LAT LONG', 'LAT: ' + lat + ' LONG ' + long);
      },
      error => {
        AlertIOS.alert('error getting location');

      }
    )
  }
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  text:{
    color: '#FFFFFF'
  }
});

module.exports = Sensors
