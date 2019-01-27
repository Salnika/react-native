import React from 'react';
import {
  Container, Header, Left, Icon, Button,
} from 'native-base';
import { connect } from 'react-redux';
import { previousPage } from '../redux/actions/nav';
import FadeInView from './animations/fadeIn';

// const styles = StyleSheet.create({
//   returnArrow: {
//     marginLeft: 0,
//   },
// });

class Router extends React.Component {
  prevPage = () => {
    this.props.prevPage(this.props.nav.view);
  };

  render() {
    const Comp = this.props.nav.component;
    let button;
    if (this.props.nav.view.length > 1) {
      button = (
        <Left>
          <Button transparent onPress={this.prevPage}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      );
    }

    return (
      <Container>
        <Header>{button}</Header>
        <Comp />
      </Container>
    );
  }
}

const mapState = state => ({
  nav: state.nav,
});

const mapDispatch = dispatch => ({
  prevPage: (oldView) => {
    dispatch(previousPage(oldView));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Router);
