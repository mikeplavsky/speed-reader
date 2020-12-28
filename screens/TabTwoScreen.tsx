import * as React from 'react';
import {StyleSheet, Clipboard} from 'react-native';
import {Input, Button} from 'react-native-elements';

import Settings from '../store/settings';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';

export default function TabTwoScreen() {

  const [state, setState] = React.useState({text:''});

  React.useLayoutEffect(() => {
    Settings.subscribe(setState);
  });

  const getText = async () => {
    const text = await Clipboard.getString();
    Settings.next({ text });
  }

  return (
    <View style={styles.container}>

      <Input label="Speed:"></Input>
      <Input label="Font:"></Input>

      <Input 
        label="Text:"
        value={state.text}
        onChangeText = {text => Settings.next({text})}
      ></Input>
      
      <Button 
        title="Paste" 
        type="clear"
        onPress={getText}></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 100,
    width: 300
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
