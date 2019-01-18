import React, { Component } from 'react';
import ItemList from './itemList';
import { List, Container, Content, Footer, Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { nextPage } from '../redux/actions/nav';

const items = [
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur vergerrrr',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur vergerrrr',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur vergerrrr',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur vergerrrr',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur vergerrrr',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur verger',
  },
  {
    uri: 'https://static.openfoodfacts.org/images/products/356/470/086/5439/front_fr.4.full.jpg',
    name: 'douceur vergerrrr',
  },
];

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
    this.state = {};
  }

  createRows = () => {
    return items.map(item => {
      return <ItemList uri={item.uri} name={item.name} />;
    });
  };

  openScanner = () => {
    this.props.registerPage(this.props.nav.view, 'barcode');
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
)(Home);
