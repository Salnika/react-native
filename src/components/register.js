import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Content, Form, Item, Input, Label, Button,
} from 'native-base';
import { connect } from 'react-redux';
import { register } from '../redux/actions/register';
import validation from './validation/validate';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      emailError: 'Email',
      passwordError: 'Password',
      passwordRepeatError: 'Password Repeat',
    };
  }

  handleUserNameChange = (value) => {
    this.setState({ username: value });
  };

  handlePasswordChange = (value) => {
    this.setState({ password: value });
  };

  handleRepeatPasswordChange = (value) => {
    this.setState({ repeatPassword: value });
  };

  submit = () => {
    const {
      username, password, repeatPassword,
    } = this.state;
    const emailError = validation('email', username);
    const passwordError = validation('password', password);
    const passwordRepeatError = validation('confirmPassword', repeatPassword);
    this.setState({
      emailError,
      passwordError,
      passwordRepeatError,
    });

    if (password === repeatPassword) register(username, password);
    else this.state.passwordRepeatError = 'Passwords are not the same';
  };

  render() {
    const {
      username, emailError, passwordError, password, passwordRepeatError, repeatPassword,
    } = this.state;
    return (
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>{emailError}</Label>
            <Input onChangeText={this.handleUserNameChange} value={username} />
          </Item>
          <Item stackedLabel>
            <Label>{passwordError}</Label>
            <Input
              secureTextEntry
              onChangeText={this.handlePasswordChange}
              value={password}
            />
          </Item>
          <Item stackedLabel last>
            <Label>{passwordRepeatError}</Label>
            <Input
              secureTextEntry
              onChangeText={this.handleRepeatPasswordChange}
              value={repeatPassword}
            />
          </Item>
          <Button full primary large onPress={this.submit}>
            <Text>Register</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}

const mapState = state => ({
  register: state.register,
});

const mapDispatch = dispatch => ({
  registerFunc: (user, pass) => {
    dispatch(register(user, pass));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Register);
