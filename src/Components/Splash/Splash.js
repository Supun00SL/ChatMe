/**
 * @author Supun Madushanka
 * This is the Splash Component
 */

import React from 'react';
import { Animated, Easing, SafeAreaView, StatusBar, Text, View,Image } from 'react-native';
import styles from './Splash.style';

class Splash extends React.Component {

  constructor(props) {
    super(props)

    this.animatedValue = new Animated.Value(0)

    this.state = {
      stopAnimation: true
    }
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      if (this.state.stopAnimation === false) {
        this.runAnimation()

        this.setState({
          stopAnimation: false
        })
      }
    })
  }

  render() {

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1, 1],
      outputRange: [0, 1, 0]
    })

    return (
      <SafeAreaView style={styles.mainContainor}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.subContainor}>
          <Animated.Image source={require('../../Assets/logo.png')} style={{
            opacity,
            width: 75,
            height: 75
          }} />
        </View>
      </SafeAreaView>
    )
  }
}

export default Splash;