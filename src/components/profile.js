import React, { Component } from 'react';
import { Text, Alert, AsyncStorage } from 'react-native';
import {
  Content, Container, Spinner, List, ListItem, Icon, Thumbnail,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInfo } from '../redux/actions/profile';

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
                <Thumbnail large square source={{ uri: picture }} />
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
});

export default connect(
  mapState,
  mapDispatch,
)(Profile);
