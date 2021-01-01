import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Text, Button} from 'react-native-elements';

import {interval, BehaviorSubject, empty} from '@react-native-community/rxjs';
import {filter, switchMap, startWith} from '@react-native-community/rxjs/operators';

import {View } from '../components/Themed';
import Settings from '../store/settings';

export default function TabOneScreen() {

  const [words, setWords] = React.useState([""]);
  const [idx, setCurrIndex] = React.useState(0);

  const [$start,] = React.useState(new BehaviorSubject(false));
  const [$tick,] = React.useState($start.pipe(
    switchMap( (x) => {
    console.log(`Start: ${x}`);
    return x ? interval(185) : empty();
  })));

  React.useEffect(() => {

    console.log('use effect');

    Settings.subscribe((data) => {

      setWords(prevWords => {

        if (data.text.length === 0 ) { return prevWords; }

        let words = data.text.split(/[\s]+/);
        words = words.filter( x => x.length );

        return words;

      });

      setCurrIndex(0);
      $start.next(false);

    });

    $tick.subscribe((x) => {
        console.log(`reading: ${x}`);
        nextWord();
      });

  }, []);
  
  const nextWord = () => {
    setCurrIndex( (idx) => {

      //if (words.length === 0 ) { return 0; } 
      //if (idx == words.length - 1) { return idx}

      return idx + 1;

   })}
     
  const startReading = () => {
    $start.next(true);
  } 
  
  const pauseReading = () => {
    $start.next(false);
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
      <Button 
        title='Pause'
        type='clear'
        onPress={pauseReading}></Button>
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
    fontSize: 50,
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
