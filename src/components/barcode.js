import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
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
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.barcode.erro) Alert.alert('Product not found', 'Product not found');
    else if (nextProps.barcode.productData) this.props.registerPage(this.props.nav.view, 'product');
  }

  _handleBarCodeRead = async data => {
    // Alert.alert('Scan successful!', JSON.stringify(data));
    await this.props.getProductInfos(data.data);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.barcode.loading ? (
          <Spinner />
        ) : this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text>Camera permission is not granted</Text>
        ) : (
          <BarCodeScanner onBarCodeRead={this._handleBarCodeRead} style={StyleSheet.absoluteFill} />
        )}
      </View>
    );
  }
}

const mapState = state => ({
  nav: state.nav,
  barcode: state.barcode,
});

const mapDispatch = dispatch => ({
  registerPage: (oldView, newView) => {
    dispatch(nextPage(oldView, newView));
  },
  getProductInfos: barcode => {
    dispatch(getProduct(barcode));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(BarCode);
