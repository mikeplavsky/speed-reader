import * as React from 'react';
import { StyleSheet, Clipboard, AppState } from 'react-native';
import {Text, Button} from 'react-native-elements';

import {interval, BehaviorSubject, empty} from '@react-native-community/rxjs';
import {filter, switchMap, startWith} from '@react-native-community/rxjs/operators';

import {View } from '../components/Themed';
import Settings from '../store/settings';
import App from '../App';

export default function TabOneScreen() {

  const [words, setWords] = React.useState([""]);
  const [idx, setCurrIndex] = React.useState(0);

  const [$start,] = React.useState(new BehaviorSubject(false));

  const [$tick,] = React.useState($start.pipe(
    switchMap( (x) => {
    return x ? interval(185) : empty();
  })));

  React.useEffect(() => {

    AppState.addEventListener("change", (x) => {
      if (x == 'active') { 
        getClipboardText(); 
      }
    });

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
      onTouchEnd = { x => {

        const start = ! $start.value;

        if (start && idx === words.length - 1) {
          setCurrIndex(0);
        }

        $start.next(start); 

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
