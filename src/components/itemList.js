import React, { Component } from 'react';
import {
  ListItem, Text, Thumbnail, Button, Icon,
} from 'native-base';
import PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';

class itemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteMode: false,
    };
  }

  toggleDelete = () => {
    const { deleteMode } = this.state;
    this.setState({ deleteMode: !deleteMode });
  };

  deleteItem = () => {
    const { id, deleteMe } = this.props;
    deleteMe(id);
  };

  render() {
    const { uri, name } = this.props;
    const { deleteMode } = this.state;
    return (
      <ListItem>
        <TouchableHighlight onLongPress={this.toggleDelete} underlayColor="red">
          <View>
            <Thumbnail small square source={{ uri }} />
            <Text>{name}</Text>
          </View>
        </TouchableHighlight>
        {deleteMode && (
          <Button onPress={this.deleteItem}>
            <Icon type="FontAwesome" name="trash" />
          </Button>
        )}
      </ListItem>
    );
  }
}

itemList.propTypes = {
  id: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteMe: PropTypes.func.isRequired,
};

export default itemList;
