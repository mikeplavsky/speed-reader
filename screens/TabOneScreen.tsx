import {useState, useEffect, useRef} from 'react';
import * as React from 'react';
import {StyleSheet, Clipboard, AppState} from 'react-native';
import {Text, Button} from 'react-native-elements';

import {interval, BehaviorSubject, empty} from '@react-native-community/rxjs';
import {switchMap} from '@react-native-community/rxjs/operators';

import {View} from '../components/Themed';
import App from '../App';

function useClipboard() {
  
  const [words, setWords] = useState([]);
  const [idx, setCurrIndex] = useState(0);
  const [text, setText] = useState('');

  const [reading, setReading] = useState(false);
  const id = useRef(0);

  useEffect(() => {

    if (reading) {

      if (idx == words.length - 1) {
        setCurrIndex(0);
      } 

      id.current = setInterval(nextWord,185);

    } 
    else {
      clearInterval(id.current); 
    }

  },[reading]);

  useEffect(() => {

    setText(words[0]);

    setReading(false);
    setCurrIndex(0);

  }, [words]);

  useEffect(() => {

    const l = words.length;

    if (idx >= l) {

      setReading(false);
      setCurrIndex(l == 0 ? 0 : l - 1);

      return;
    }

    setText(words[idx]);

  }, [idx]);

  useEffect(() => {

    const stateChange =  (x) => {
      if (x == 'active') { 
        getClipboardText(); 
      }
    };

    AppState.addEventListener("change", stateChange); 
    return () => AppState.removeEventListener("change", stateChange);

  }, []);
  
  const nextWord = () => { 

    setCurrIndex( idx => {
      return idx + 1; 
    }); 

  }
     
  const getClipboardText = async () => {

    const data = await Clipboard.getString();

    setWords(prevWords => {

      if (data.length === 0 ) { return prevWords; }

      let words = data.split(/[\s]+/);
      words = words.filter( x => x.length );
      
      return words;

    });

  }

  const toggleIt = () => {

      setReading( (wasReading) => {
        return !wasReading;
      });

  }

  return [text, toggleIt];

}

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
