import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';

import {View} from '../components/Themed';
import App from '../App';

import useClipboard from '../hooks/useClipboard';

export default function TabOneScreen() {

  const [text, toggleIt] = useClipboard();
    
  return (

    <View style={styles.container} 
      onTouchEnd = {toggleIt}
    >
      <Text style={styles.title}>{text}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 50,
    color: 'white'
  },
});
