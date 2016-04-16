'use strict'

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
  Image
} = React;

class Home extends Component{

  render(){
    return (
     <View style={styles.view}>
      <Text style={styles.text}>
        React Native
      </Text>
      <Image
        style={styles.logo}
            resizeMode='contain'
        source={require('../icons/opengraph.png')}
      />
    </View>
  );
  }
}

const styles = StyleSheet.create({

view:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#000000',
  },

  logo:{
    width: 250,
    height: 250,
 },
 text:{
   color: '#48BBEC',
   fontSize:50,
 }
});

module.exports = Home
