import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';

import {View} from '../components/Themed';
import App from '../App';

import useClipboard from '../hooks/useClipboard';

export default function TabOneScreen() {

  const [text, toggleIt, prevWord, nextWord] = useClipboard();
  const [size, setSize] = React.useState({height:0,width:0});

  const touchEnd = (
    {nativeEvent:{locationX,locationY}},
    {width,height}) => {

    if (locationY > height/2 ) {
      toggleIt();
    }
    else {
        if (locationX < width/2) {
          prevWord();
        }
        else {
          nextWord();
        }
    }

  }
    
  return (

    <View style={styles.container} 
      onLayout = {x => {
        setSize({
          height: x.nativeEvent.layout.height,
          width: x.nativeEvent.layout.width
        });
      }}
      onTouchEnd = {(x) => touchEnd(x,size)}
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
