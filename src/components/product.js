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
    this.setState({ product: barcode.productData });
  }

  componentWillReceiveProps(nextProps) {
    const { barcode } = nextProps;
    this.setState({ product: barcode.productData });
  }

  render() {
    const { product } = this.state;

    return (
      <Container>
        {product ? (
          <Grid>
            <Col style={{ width: 100 }}>
              <Thumbnail
                large
                square
                source={{
                  uri: product.image_url
                    ? product.image_url
                    : 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                }}
              />
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
};

const mapState = state => ({
  barcode: state.barcode,
});

export default connect(mapState)(Product);
