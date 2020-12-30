import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Text, Button} from 'react-native-elements';

import {timer} from '@react-native-community/rxjs';

import {View } from '../components/Themed';
import Settings from '../store/settings';

export default function TabOneScreen() {

  const [words, setWords] = React.useState([""]);
  const [idx, setCurrIndex] = React.useState(0);

  React.useEffect(() => {
    Settings.subscribe((data) => {
      if (data.text.length === 0 ) { return; }

      let words = data.text.split(/[\s]+/);
      words = words.filter( x => x.length );

      setWords(words);
      setCurrIndex(0);

    });
  }, []);

  const nextWord = () => {

    if (words.length === 0 ) { return ""; } 
    let i = idx + 1;
    setCurrIndex(i);

  }

  const startReading = () => {

    const src = timer(1000, 1000);
    src.subscribe(x => {
      console.log(x);
    });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{words[idx]}</Text>
      <Button 
        title='Next'
        type='clear'
        onPress={nextWord}></Button>
      <Button 
        title='Start'
        type='clear'
        onPress={startReading}></Button>
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
