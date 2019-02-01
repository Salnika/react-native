import React, { Component } from 'react';
import {
  Text, Alert, StyleSheet, AsyncStorage,
} from 'react-native';
import {
  Content, Form, Item, Input, Label, Button, Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions/login';
import { nextPage } from '../redux/actions/nav';

const styles = StyleSheet.create({
  full: {
    width: '100%',
    alignItems: 'center',
  },
  margin: {
    marginBottom: 15,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount = async () => {
    const { registerPage, nav } = this.props;
    const isLogged = await AsyncStorage.getItem('isLogged');
    if (isLogged !== null && isLogged) {
      registerPage(nav.view, 'home');
    }
  };

  componentWillReceiveProps = async (nextProps) => {
    const { registerPage, nav } = this.props;
    const { login } = nextProps;
    if (login.token) {
      await AsyncStorage.setItem('isLogged', login.token);
      registerPage(nav.view, 'home');
    } else if (login.error) {
      Alert.alert('error', login.error);
      Alert.alert('Login Error', 'Wrong username or password');
    }
  };

  handleUserNameChange = (value) => {
    this.setState({ username: value });
  };

  handlePasswordChange = (value) => {
    this.setState({ password: value });
  };

  submit = async () => {
    const { loginFunc } = this.props;
    const { username, password } = this.state;
    await loginFunc(username.toLowerCase(), password);
  };

  goToRegister = () => {
    const { registerPage, nav } = this.props;
    registerPage(nav.view, 'register');
  };

  render() {
    const { login, nav } = this.props;
    const { username, password } = this.state;
    return (
      <Content>
        {login.loading ? (
          <Spinner />
        ) : (
          <Form>
            <Item inlineLabel>
              <Label>
                Email
                {nav[nav.length - 1]}
              </Label>
              <Input onChangeText={this.handleUserNameChange} value={username} />
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={this.handlePasswordChange} value={password} />
            </Item>
            <Button style={styles.margin} onPress={this.submit}>
              <Text style={styles.full}>Login</Text>
            </Button>
            <Button onPress={this.goToRegister}>
              <Text style={styles.full}>Create an account</Text>
            </Button>
          </Form>
        )}
      </Content>
    );
  }
}

const mapState = state => ({
  login: state.login,
  nav: state.nav,
});

const mapDispatch = dispatch => ({
  loginFunc: (user, pass) => {
    dispatch(login(user, pass));
  },
  registerPage: (oldView, newView) => {
    dispatch(nextPage(oldView, newView));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Login);
