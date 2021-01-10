
import {useState, useEffect, useRef} from 'react';
import * as React from 'react';
import {Clipboard, AppState} from 'react-native';

export default function useClipboard() {
  
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

    return () => {clearInterval(id.current);}; 

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
      else {
        setReading(false);
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
