import React from 'react';
import {create} from 'react-test-renderer';
import {timer} from '@react-native-community/rxjs';

jest.mock('../hooks/useClipboard');

import useClipboard from "../hooks/useClipboard";
import TabOneScreen from '../screens/TabOneScreen';

afterAll(() => jest.unmock('../hooks/useClipboard'));

describe("TabOnceScreen", () => {

    it ("renders text", () => {
        
        useClipboard.mockImplementation(
            () => ["Once", "toggleItOnce"]);

        expect(create( <TabOneScreen />)) 
            .toMatchSnapshot(); 

        useClipboard.mockImplementation(
            () => ["Twice", "toggleItTwice"]);

        expect(create( <TabOneScreen />)) 
            .toMatchSnapshot(); 

    });

});
