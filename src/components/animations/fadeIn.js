import React from 'react';
import { Animated } from 'react-native';

class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.shown = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    Animated.timing(
      this.shown, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 0,
        useNativeDriver: true,
      },
    ).start(() => {}); // Starts the animation
  };

  render() {
    return (
      <Animated.View // Special animatable View
        style={{
          opacity: this.shown, // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeInView;
