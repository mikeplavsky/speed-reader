import * as React from 'react';
import { StyleSheet, Clipboard, TouchableHighlight } from 'react-native';
import {Text, Button} from 'react-native-elements';

import {interval, BehaviorSubject, empty} from '@react-native-community/rxjs';
import {filter, switchMap, startWith} from '@react-native-community/rxjs/operators';

import {View } from '../components/Themed';
import Settings from '../store/settings';

export default function TabOneScreen() {

  const [words, setWords] = React.useState([""]);
  const [idx, setCurrIndex] = React.useState(0);

  const [width,setWidth] = React.useState(0);

  const [$start,] = React.useState(new BehaviorSubject(false));

  const [$tick,] = React.useState($start.pipe(
    switchMap( (x) => {
    return x ? interval(185) : empty();
  })));

  React.useEffect(() => {

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
        nextWord();
      });

  }, []);
  
  const nextWord = () => { 
    setCurrIndex( idx => idx + 1 ); 
  }
     
  const startReading = () => {
    $start.next(true);
  } 
  
  const pauseReading = () => {
    $start.next(false);
  } 
  
  const txt = `
      Sample text
      for functionality testing  
      When foxes start jumping
      You'd better run 
      When wolves are coming
      You'd better hide
  `

  const getClipboardText = async () => {

    const text = await Clipboard.getString() || txt;
    Settings.next({ text });

    startReading();

  }
  
  const getText = () => {

    let i = idx; 

    if (words.length && i === words.length) {

      pauseReading();

      i = words.length - 1; 
      setCurrIndex(i);

    }

    return words[i] ;
  }
    
  return (

    <View style={styles.container} 

      onLayout = {(x) => {
        setWidth(x.nativeEvent.layout.width);
      }}

      onTouchEnd = {(x) => {

        const left = x.nativeEvent.locationX < width/2;

        if (!left) { $start.next( ! $start.value); }
        else { getClipboardText(); }

      }}
    
    >
      <Text style={styles.title}>{ getText() }</Text>
      
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
