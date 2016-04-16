'use strict';

var React = require('react-native');
var Sensors = require('./Components/Sensors.ios');
var Actuators = require('./Components/Actuators.ios');
var UserInterface = require('./Components/UserInterface.ios');
var Home = require('./Components/Home.ios.js');
var Architecture = require('./Components/Architecture.ios');

var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS,
  TabBarIOS,
} = React;


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

var MADReactNative = React.createClass({
  getInitialState: function() {
    return {
      tab: 'Home',
    }
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          icon={require('./icons/home.png')}
          title='Home'
          onPress={() => {this.setState({ tab: 'Home' }); }}
          selected={this.state.tab === 'Home'}
        >
          <NavigatorIOS
            barTintColor='#000000'
            style={styles.container}
            initialRoute={{title: '', component: Home}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/sensors.png')}
          title='Sensoren'
          onPress={() => {this.setState({ tab: 'Sensors' }); }}
          selected={this.state.tab === 'Sensors'}
        >
          <NavigatorIOS
            barTintColor='#000000'
            style={styles.container}
            initialRoute={{title: '', component: Sensors}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/actuators.png')}
          title='Actuatoren'
          onPress={() => {this.setState({ tab: 'Actuators' }); }}
          selected={this.state.tab === 'Actuators'}
        >
          <NavigatorIOS
            barTintColor='#000000'
            style={styles.container}
            initialRoute={{title: '', component: Actuators}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/UI.png')}
          title='UserInterface'
          onPress={() => {this.setState({ tab: 'UserInterface' }); }}
          selected={this.state.tab === 'UserInterface'}
        >
          <NavigatorIOS
            barTintColor='#000000'
            style={styles.container}
            initialRoute={{title: '', component: UserInterface}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/architecture.png')}
          title='Architectuur'
          onPress={() => {this.setState({ tab: 'Architecture' }); }}
          selected={this.state.tab === 'Architecture'}
        >
          <NavigatorIOS
            barTintColor='#000000'
            style={styles.container}
            initialRoute={{title: '', component: Architecture}}
          />
        </TabBarIOS.Item>
    </TabBarIOS>
    );
  }
});

AppRegistry.registerComponent('MADReactNative', () => MADReactNative);
