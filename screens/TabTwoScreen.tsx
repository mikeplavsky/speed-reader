import * as React from 'react';
import {StyleSheet} from 'react-native';

import Settings from '../store/settings';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';

export default function TabTwoScreen() {

  const [state, setState] = React.useState({text:''});

  React.useLayoutEffect(() => {
    Settings.subscribe(setState);
  });

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.title} 
        value={state.text}
        onChangeText = {text => Settings.next({text})}
        ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
