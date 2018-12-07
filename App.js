import React from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Router from './src/components/router';

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
});

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.droidSafeArea}>
        <Router />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
