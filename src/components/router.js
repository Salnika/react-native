import React from 'react';
import {
  Container, Header, Left, Icon, Button, Right,
} from 'native-base';

import { connect } from 'react-redux';
import { previousPage, nextPage } from '../redux/actions/nav';

class Router extends React.Component {
  prevPage = () => {
    const { prevPage, nav } = this.props;
    prevPage(nav.view);
  };

  openMenu = () => {
    const { registerPage, nav } = this.props;
    if (nav.view[nav.view.length - 1] !== 'menu') registerPage(nav.view, 'menu');
  };

  render() {
    const { nav } = this.props;
    const Comp = nav.component;

    return (
      <Container>
        {nav.view.length > 1 && nav.view[nav.view.length - 1] !== 'login' ? (
          <Header>
            <Left>
              <Button style={{ marginLeft: 0 }} transparent onPress={this.openMenu}>
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
  registerPage: (oldView, newView) => {
    dispatch(nextPage(oldView, newView));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Router);
