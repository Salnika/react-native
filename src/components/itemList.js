import React, { Component } from 'react';
import { ListItem, Text, Thumbnail } from 'native-base';

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

export default itemList;
