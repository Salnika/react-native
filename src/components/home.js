import _ from 'lodash';
import React, { Component } from 'react';
import {
  List, Container, Content, Footer, Button, Icon,
} from 'native-base';
import { StyleSheet, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './itemList';
import { nextPage } from '../redux/actions/nav';

const styles = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.loadItems();
  }

  loadItems = async () => {
    const items = await AsyncStorage.getItem('itemList');
    if (items !== null) {
      this.setState({ items: JSON.parse(items).reverse() });
    }
  };

  itemDeleted = async (id) => {
    let items = await AsyncStorage.getItem('itemList');

    if (items !== null) {
      items = JSON.stringify(_.reject(JSON.parse(items), { id }));

      await AsyncStorage.setItem('itemList', items);
      this.setState({ items: JSON.parse(items).reverse() });
    }
  };

  componentDidMount = () => {
    this.loadItems();
  };

  componentWillReceiveProps = () => {
    this.loadItems();
  };

  createRows = () => {
    const { items } = this.state;
    return items.map((item, index) => (
      <ItemList
        id={item.id}
        key={item.name}
        uri={item.uri}
        name={item.name}
        deleteMe={this.itemDeleted}
      />
    ));
  };

  openScanner = () => {
    const { registerPage, nav } = this.props;
    registerPage(nav.view, 'barcode');
  };

  render() {
    const rows = this.createRows();
    return (
      <Container>
        <Content>
          <List>{rows}</List>
        </Content>
        <Footer>
          <Button onPress={this.openScanner} style={styles.full}>
            <Icon type="FontAwesome" name="barcode" />
          </Button>
        </Footer>
      </Container>
    );
  }
}

Home.propTypes = {
  registerPage: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapState = state => ({
  nav: state.nav,
  barcode: state.barcode,
});

const mapDispatch = dispatch => ({
  registerPage: (oldView, newView) => {
    dispatch(nextPage(oldView, newView));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Home);
