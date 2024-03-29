import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import { Spinner } from 'native-base';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import { nextPage } from '../redux/actions/nav';
import { getProduct } from '../redux/actions/barcode';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

class BarCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    };
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  componentWillReceiveProps(nextProps) {
    const { registerPage, nav } = this.props;
    if (nextProps.barcode.error) Alert.alert('Product not found', 'Product not found');
    else if (nextProps.barcode.productData) {
      registerPage(nav.view, 'product');
    }
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleBarCodeRead = async (data) => {
    const { getProductInfos } = this.props;
    await getProductInfos(data.data);
  };

  getItemToDisplay = (loading, hasCameraPermission) => {
    if (loading) {
      return <Spinner />;
    }
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>Camera permission is not granted</Text>;
    }
    return (
      <BarCodeScanner onBarCodeRead={this.handleBarCodeRead} style={StyleSheet.absoluteFill} />
    );
  };

  render() {
    const { loading } = this.props;
    const { hasCameraPermission } = this.state;
    const itemToDisplay = this.getItemToDisplay(loading, hasCameraPermission);
    return <View style={styles.container}>{itemToDisplay}</View>;
  }
}

BarCode.propTypes = {
  registerPage: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    view: PropTypes.array,
    Component: PropTypes.element,
  }).isRequired,
  barcode: PropTypes.shape({
    error: PropTypes.string.isRequired,
    productData: PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      product_name_fr: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      nutrition_grades: PropTypes.string.isRequired,
      brands: PropTypes.string.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
};

BarCode.defaultProps = {
  loading: false,
};

const mapState = state => ({
  nav: state.nav,
  barcode: state.barcode,
});

const mapDispatch = dispatch => ({
  registerPage: (oldView, newView) => {
    dispatch(nextPage(oldView, newView));
  },
  getProductInfos: (barcode) => {
    dispatch(getProduct(barcode));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(BarCode);
