import React, { Component } from 'react';
import { Text } from 'react-native';
import { Content, Form, Item, Input, Label, Button } from 'native-base';
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

  submit = () => {
    this.props.loginFunc(this.state.username, this.state.password);
    this.props.registerPage(this.props.nav.view, 'home');
  };

  goToRegister = () => {
    this.props.registerPage(this.props.nav.view, 'register');
  };

  render() {
    return (
      <Content>
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
        </Form>
        <Button onPress={this.goToRegister}>
          <Text>Create an account</Text>
        </Button>
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
