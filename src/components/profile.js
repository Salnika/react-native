import React, { Component } from 'react';
import { Text, Alert, AsyncStorage, TouchableHighlight } from 'react-native';
import {
  Content, Container, Spinner, List, ListItem, Icon, Thumbnail, Button, Form,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { getInfo, uploadProfilePicture } from '../redux/actions/profile';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMail: '',
      picture: '',
      loading: false,
    };
  }

  componentWillMount = async () => {
    const { fetchInfo } = this.props;
    const token = await AsyncStorage.getItem('isLogged');
    if (token !== null) fetchInfo(token);
  };

  componentWillReceiveProps = (nextProps) => {
    const {
      error, userMail, loading, picture,
    } = nextProps.profile;
    if (error) {
      Alert.alert('Error', 'Cant fetch userdata');
    } else {
      this.setState({ userMail });
      this.setState({ picture });
      this.setState({ loading });
    }
  };

  askProfilePicture = async () => {
    const { uploadPicture } = this.props;
    const token = await AsyncStorage.getItem('isLogged');
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (token !== null && result.uri !== null) {
      uploadPicture(token, result);
      this.setState({ picture: result.uri });
    }
  };

  render() {
    const { userMail, picture, loading } = this.state;
    return (
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <Content>
            <List>
              <ListItem>
                <TouchableHighlight onPress={() => this.askProfilePicture()}>
                  <Thumbnail
                    large
                    square
                    source={{ uri: picture }}
                  />
                </TouchableHighlight>
              </ListItem>
              <ListItem>
                <Text>{userMail}</Text>
              </ListItem>
            </List>
          </Content>
        )}
      </Container>
    );
  }
}

// Profile.propTypes = {
//   userEmail: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
// };

const mapState = state => ({
  profile: state.profile,
});

const mapDispatch = dispatch => ({
  fetchInfo: (token) => {
    dispatch(getInfo(token));
  },
  uploadPicture: (token, picture) => {
    dispatch(uploadProfilePicture(token, picture));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Profile);
