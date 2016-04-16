'use strict';


var Camera = require('react-native-camera');
var React = require('react-native');
var TouchID = require('react-native-touch-id');
var wifi = require('react-native-wifi-checker');

var BlueTooth = require('./bluetooth');
var CameraClass = require('./Camera');
var ActivityIndicatorClass = require('./ActivityIndicator');

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
var bluetooth = "unknown";

class UserInterface extends Component {

  state = {
     avatarSource: null,
     videoSource: null
   };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}
            onPress={this.showAlert}>
            <Text style={styles.buttonText}>Alert IOS</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.pickImage}>
            <Text style={styles.buttonText}>Image Picker</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.navToActivityIndicator.bind(this)}>
            <Text style={styles.buttonText}>Activity Indicator</Text>
          </TouchableHighlight>
      </View>
    );
  }

  navToActivityIndicator(){
    this.props.navigator.push({
      title: 'Activity Indicator',
      component: ActivityIndicatorClass
    })
  }

  showAlert() {
    AlertIOS.alert('Awesome Alert', 'This is my first React Native alert.', [{text: 'Thanks'}] )
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
  }
});

//React.AppRegistry.registerComponent('GPSVibrateAlert', () => GPSVibrateAlert);
module.exports = UserInterface
