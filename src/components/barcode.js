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
    // Alert.alert('Scan successful!', JSON.stringify(data));
    const { getProductInfos } = this.props;
    await getProductInfos(data.data);
  };

  render() {
    const { loading } = this.props;
    const { hasCameraPermission } = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <Spinner />
        ) : hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : hasCameraPermission === false ? (
          <Text>Camera permission is not granted</Text>
        ) : (
          <BarCodeScanner onBarCodeRead={this.handleBarCodeRead} style={StyleSheet.absoluteFill} />
        )}
      </View>
    );
  }
}

BarCode.propTypes = {
  registerPage: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  barcode: PropTypes.object.isRequired,
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
