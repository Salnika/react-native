import React, { Component } from 'react';
import {
  Container, List, ListItem, Text, Icon, Content,
} from 'native-base';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { nextPage } from '../redux/actions/nav';

class Menu extends Component {
  goToHome = () => {
    const { registerPage, nav } = this.props;
    registerPage(nav.view, 'home');
  };

  goToBarcode = () => {
    const { registerPage, nav } = this.props;
    registerPage(nav.view, 'barcode');
  };

  disconnect = async () => {
    await AsyncStorage.removeItem('isLogged');
    await AsyncStorage.removeItem('itemList');
    const { registerPage, nav } = this.props;
    registerPage(nav.view, 'login');
  };

  goToProfile = () => {
    const { registerPage, nav } = this.props;
    registerPage(nav.view, 'profile');
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem onPress={this.goToHome}>
              <Icon type="FontAwesome" name="home" />
              <Text>Home</Text>
            </ListItem>
            <ListItem onPress={this.goToBarcode}>
              <Icon type="FontAwesome" name="barcode" />
              <Text>Scan Product</Text>
            </ListItem>
            <ListItem onPress={this.goToProfile}>
              <Icon type="FontAwesome" name="user" />
              <Text>Profile</Text>
            </ListItem>
            <ListItem onPress={this.disconnect}>
              <Icon type="FontAwesome" name="sign-out" />
              <Text>Disconnect</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

Menu.propTypes = {
  registerPage: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    view: PropTypes.array,
    Component: PropTypes.element,
  }).isRequired,
};

const mapState = state => ({
  nav: state.nav,
});

const mapDispatch = dispatch => ({
  registerPage: (oldView, newView) => {
    dispatch(nextPage(oldView, newView));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Menu);
