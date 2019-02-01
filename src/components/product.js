import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Text, Thumbnail, Spinner,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    const { barcode } = this.props;
    this.setState({ product: barcode.productData.product });
  }

  componentWillReceiveProps(nextProps) {
    const { barcode } = nextProps;
    this.setState({ product: barcode.productData.product });
  }

  render() {
    const { product } = this.state;

    return (
      <Container>
        {product ? (
          <Grid>
            <Col style={{ width: 100 }}>
              <Thumbnail large square source={{ uri: product.image_url }} />
            </Col>
            <Col>
              <Row>
                <Text>{product.product_name_fr}</Text>
              </Row>
              <Row>
                <Text>Brand:</Text>
                <Text>{product.brands}</Text>
              </Row>
              <Row>
                <Text>Quantity:</Text>
                <Text>{product.quantity}</Text>
              </Row>
              <Row>
                <Text>
                  Nutriscore:
                  {product.nutrition_grades}
                </Text>
              </Row>
            </Col>
          </Grid>
        ) : (
          <Spinner />
        )}
      </Container>
    );
  }
}

Product.propTypes = {
  barcode: PropTypes.object,
  nav: PropTypes.shape({
    view: PropTypes.array,
    Component: PropTypes.element,
  }).isRequired,
};

const mapState = state => ({
  barcode: state.barcode,
});

export default connect(mapState)(Product);
