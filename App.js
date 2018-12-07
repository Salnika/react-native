import React from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Container, Header } from 'native-base';
import { Provider } from 'react-redux';
import Login from './src/components/login';
import store from './src/redux/store';

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.droidSafeArea}>
          <Container>
            <Header />
            <Login />
          </Container>
        </SafeAreaView>
      </Provider>
    );
  }
}
