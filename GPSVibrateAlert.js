'use strict';


var Camera = require('react-native-camera');
var React = require('react-native');
var TouchID = require('react-native-touch-id');
var wifi = require('react-native-wifi-checker');

var {DeviceEventEmitter} = React;

require('react-native-bluetooth-state');

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
var bluetooth = "unknown";

class GPSVibrateAlert extends Component {

  state = {
     avatarSource: null,
     videoSource: null
   };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Welcome to React Native!
        </Text>
        <TouchableHighlight style={styles.button}
            onPress={this.showAlert}>
            <Text style={styles.buttonText}>Alert IOS</Text>
          </TouchableHighlight>

        <TouchableHighlight style={styles.button}
            onPress={this.vibrate}>
            <Text style={styles.buttonText}>Vibrate</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.showLocation}>
            <Text style={styles.buttonText}>Location</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useAccelerator}>
            <Text style={styles.buttonText}>Accelerometer</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useGyroscope}>
            <Text style={styles.buttonText}>Gyroscope</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useMagnetoMeter}>
            <Text style={styles.buttonText}>Magnetometer</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.useTouchId}>
            <Text style={styles.buttonText}>TouchID</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.pickImage}>
            <Text style={styles.buttonText}>Image Picker</Text>
          </TouchableHighlight>
      </View>
    );
  }

  vibrate(){
    VibrationIOS.vibrate();
  }

  showAlert() {
    AlertIOS.alert('Awesome Alert', 'This is my first React Native alert.', [{text: 'Thanks'}] )
  }

  useAccelerator(){
    if(accelerometerStarted == false){
      Accelerometer.setAccelerometerUpdateInterval(0.1); // in seconds
      DeviceEventEmitter.addListener('AccelerationData', function (data) {

        console.log("Accelerometer X: " + data.acceleration.x);
        console.log("Accelerometer Y: " + data.acceleration.y);
        console.log("Accelerometer Z: " + data.acceleration.z);

      });
      Accelerometer.startAccelerometerUpdates();
      accelerometerStarted = true;
    } else{
      Accelerometer.stopAccelerometerUpdates();
      accelerometerStarted = false;
    }
  }

  useGyroscope(){
    if(gyroscopeStarted == false){
      Gyroscope.setGyroUpdateInterval(0.1); // in seconds
      DeviceEventEmitter.addListener('GyroData', function (data) {

        console.log("Gyroscope X" + data.rotationRate.x);
        console.log("Gyroscope Y" + data.rotationRate.y);
        console.log("Gyroscope Z" + data.rotationRate.z);

      });
      Gyroscope.startGyroUpdates();
      gyroscopeStarted = true;
    } else{
      Gyroscope.stopGyroUpdates();
      gyroscopeStarted = false;
    }
  }

  useMagnetoMeter(){
    if(magnetoMeter == false){

      Magnetometer.setMagnetometerUpdateInterval(0.1); // in seconds
      DeviceEventEmitter.addListener('MagnetometerData', function (data) {

        console.log("Magnetometer X: " + data.magneticField.x);
        console.log("Magnetometer Y: " + data.magneticField.y);
        console.log("Magnetometer Z: " + data.magneticField.z);

      });
      Magnetometer.startMagnetometerUpdates();
      magnetoMeter = true;
    } else{
      Magnetometer.stopMagnetometerUpdates();
      magnetoMeter = false;
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
  pickImage() {

    const options = {
      title: 'Photo Picker',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};

        this.setState({
          avatarSource: source
        });
      }
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
    backgroundColor: '#FFFFFF'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

//React.AppRegistry.registerComponent('GPSVibrateAlert', () => GPSVibrateAlert);
module.exports = GPSVibrateAlert
