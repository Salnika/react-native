import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { login } from '../redux/actions/login';
import { nextPage } from '../redux/actions/nav';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUserNameChange = value => {
    this.setState({ username: value });
  };

  handlePasswordChange = value => {
    this.setState({ password: value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.token) this.props.registerPage(this.props.nav.view, 'home');
    else if (nextProps.login.error) {
      Alert.alert('Login Error', 'Wrong username or password');
    }
  }

  submit = async () => {
    await this.props.loginFunc(this.state.username.toLowerCase(), this.state.password);
  };

  goToRegister = () => {
    this.props.registerPage(this.props.nav.view, 'register');
  };

  render() {
    return (
      <Content>
        {this.props.login.loading ? (
          <Spinner />
        ) : (
          <Form>
            <Item inlineLabel>
              <Label>Username {this.props.nav[this.props.nav.length - 1]}</Label>
              <Input onChangeText={this.handleUserNameChange} value={this.state.username} />
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={this.handlePasswordChange}
                value={this.state.password}
              />
            </Item>
            <Button onPress={this.submit}>
              <Text>Login</Text>
            </Button>
            <Button onPress={this.goToRegister}>
              <Text>Create an account</Text>
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
