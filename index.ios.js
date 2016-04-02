'use strict';

var React = require('react-native');
var GPSVibrateAlert = require('./GPSVibrateAlert');
var Camera = require('./Camera');
var Example = require('./bluetooth');
//var Activity = require('./ActivityIndicator');

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class MADReactNative extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Multiple actions',
          component: GPSVibrateAlert,
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('MADReactNative', () => MADReactNative);
