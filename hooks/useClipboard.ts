
import {useEffect, useReducer} from 'react';
import * as React from 'react';
import {Clipboard, AppState} from 'react-native';

export function wordsReducer(state, action) {

    switch (action.type) {

        case "NEXT": 

            const l = state.words.length;

            let idx = state.idx + 1;
            let reading = true; 

            if (idx >= l) {

                reading = false;
                idx = l == 0 ? 0 : l - 1;

            }

            let text = state.words[idx];

            return {
                ...state,
                reading,
                idx,
                text
            };

        case "TOGGLE":

            reading = ! state.reading;
            idx = state.idx;

            if (idx === state.words.length - 1 && reading) {
                idx = 0;
            }

            text = state.words[idx];

            return {
                ...state,
                reading,
                idx,
                text
            };

        case "PAUSE":

            return {
                ...state,
                reading: false
            };

        case "DATA":

            if (action.data == state.data) {
                return state;
            }

            let data = action.data;

            let words = data.split(/[\s]+/);
            words = words.filter( x => x.length );
            text = words[0];

            return {
                data,
                words,
                idx: 0,
                text,
                reading: false
            };
    }

    return state;
}

export default function useClipboard() {
   
    const [state, dispatch] = useReducer(
        wordsReducer,{
            data: '',
            words: [],
            idx: 0,
            text: '',
            reading: false
        });   
    
    useEffect(() => {

        if (state.reading) {

            id = setInterval(
                () => dispatch({type: "NEXT"}),185);

            return () => clearInterval(id);
        } 

    },[state.reading]);

    useEffect(() => {
        
        getClipboardText(); 

        const stateChange = (x) => {

            if (x == 'active') { 
                getClipboardText(); 
            }
            else {
                dispatch({type: "PAUSE"});
            }

        };

        AppState.addEventListener("change", stateChange); 
        return () => AppState.removeEventListener("change", stateChange);

    }, []);
  
     
    const getClipboardText = async () => {

        const data = await Clipboard.getString();
        dispatch({type: "DATA", data});

    }

    const toggleIt = () => {
        dispatch({type: "TOGGLE"});
    }

    return [state.text, toggleIt];

}
