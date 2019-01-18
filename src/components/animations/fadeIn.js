import React from 'react';
import { Animated, Text } from 'react-native';
import { View } from 'native-base';

class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this._shown = new Animated.Value(0);
  }

  componentDidMount() {
    console.log('here');
    this.animate();
  }

  animate = () => {
    Animated.timing(
      this._shown, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 0,
        useNativeDriver: true,
      },
    ).start(() => {
      console.log('done');
    }); // Starts the animation
  };

  render() {
    return (
        <Animated.View // Special animatable View
          style={{
            opacity: this._shown, // Bind opacity to animated value
          }}
        >
          {this.props.children}
        </Animated.View>
    );
  }
}

export default FadeInView;
