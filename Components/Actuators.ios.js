'use strict';


var Camera = require('react-native-camera');
var React = require('react-native');
var BlueTooth = require('./bluetooth');
var CameraClass = require('./Camera');
var WifiClass = require('./Wifi.ios');
var {DeviceEventEmitter} = React;
var bluetooth = "unknown";
require('react-native-bluetooth-state');

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

class Actuators extends Component {

  state = {
     avatarSource: null,
     videoSource: null
   };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}
            onPress={this.vibrate}>
            <Text style={styles.buttonText}>Vibrate</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.navToBluetooth.bind(this)}>
            <Text style={styles.buttonText}>Bluetooth</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={this.navToCamera.bind(this)}>
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableHighlight>
      </View>
    );
  }

  navToCamera(){
    this.props.navigator.push({
      title: 'Camera',
      component: CameraClass
    })
  }

  navToBluetooth(){
    this.props.navigator.push({
      title: 'Bluetooth',
      component: BlueTooth
    })
  }
  vibrate(){
    VibrationIOS.vibrate();
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

module.exports = Actuators
