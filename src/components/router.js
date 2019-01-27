import React from 'react';
import {
  Container, Header, Left, Icon, Button, Right,
} from 'native-base';
import { connect } from 'react-redux';
import { previousPage } from '../redux/actions/nav';
import FadeInView from './animations/fadeIn';

class Router extends React.Component {
  prevPage = () => {
    const { prevPage, nav } = this.props;
    prevPage(nav.view);
  };

  render() {
    const { nav } = this.props;
    const Comp = nav.component;

    return (
      <Container>
        {nav.view.length > 1 ? (
          <Header>
            <Left>
              <Button style={{ marginLeft: 0 }} transparent onPress={this.prevPage}>
                <Icon ios="ios-menu" android="md-menu" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={this.prevPage}>
                <Icon name="arrow-back" />
              </Button>
            </Right>
          </Header>
        ) : (
          <Header />
        )}

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
