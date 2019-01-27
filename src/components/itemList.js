import React, { Component } from 'react';
import { ListItem, Text, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';

class itemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  callSync = (method) => {
    const { id } = this.props;
    method(id);
  };

  render() {
    const { uri, name, method } = this.props;
    return (
      <ListItem>
        <TouchableHighlight onLongPress={() => this.callSync(method)} underlayColor="red">
          <View>
            <Thumbnail small source={{ uri }} />
            <Text>{name}</Text>
          </View>
        </TouchableHighlight>
      </ListItem>
    );
  }
}

itemList.propTypes = {
  id: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  method: PropTypes.func,
};

export default itemList;
