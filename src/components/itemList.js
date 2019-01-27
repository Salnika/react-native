import React, { Component } from 'react';
import { ListItem, Text, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';

class itemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { uri, name } = this.props;
    return (
      <ListItem>
        <Thumbnail small source={{ uri }} />
        <Text>{name}</Text>
      </ListItem>
    );
  }
}

itemList.propTypes = {
  uri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default itemList;
