import React, { Component } from 'react';
import { Text } from 'react-native';
import { Content, Form, Item, Input, Label, Button } from 'native-base';
import { connect } from 'react-redux';
import { register } from '../redux/actions/register';
import validation from './validation/validate'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      emailError: 'Email',
      passwordError: 'Password',
      passwordRepeatError: 'Password Error'
    };
  }

  handleUserNameChange = value => {
    this.setState({ username: value });
  };

  handlePasswordChange = value => {
    this.setState({ password: value });
  };

  handleRepeatPasswordChange = value => {
    this.setState({ repeatPassword: value });
  };


  submit = () => {
    const emailError = validation('email', this.state.username);
    const passwordError = validation({'confirmPassword', 'password'}, this.state.password);

    this.setState({
      emailError: emailError,
      passwordError: passwordError,
      passwordRepeatError: passwordRepeatError
    });

    console.log(emailError);

    if (this.state.password === this.state.repeatPassword)
      this.props.registerFunc(this.state.username, this.state.password);
    else
      this.state.passwordRepeatError = "Passwords are not the same"
  };

  render() {
    return (
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>{this.state.emailError}</Label>
            <Input onChangeText={this.handleUserNameChange} value={this.state.username}/>
          </Item>
          <Item stackedLabel>
            <Label>{this.state.passwordError}</Label>
            <Input
              secureTextEntry
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
            />
          </Item>
          <Item stackedLabel last>
            <Label>{this.state.passwordRepeatError}</Label>
            <Input
              secureTextEntry
              onChangeText={this.handleRepeatPasswordChange}
              value={this.state.repeatPassword}
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
