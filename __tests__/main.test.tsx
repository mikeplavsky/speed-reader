import React from 'react';
import TestRenderer from 'react-test-renderer';
import {timer} from '@react-native-community/rxjs';

const { act } = TestRenderer;

import TabOneScreen from '../screens/TabOneScreen';

describe("App", () => {

    const AppState = {
        addEventListener() {},
        removeEventListener() {}
    };    

    it ("renders", () => {

        const tree = TestRenderer.create(
            <TabOneScreen AppState={AppState}/>); 

        expect(tree).toMatchSnapshot(); 
    });

    it ("renders text", async () => {

        const Clipboard = {};

        const tree = TestRenderer.create(
                <TabOneScreen 
                    AppState={AppState}
                    Clipboard={Clipboard}/>); 

        act(() => {
            tree.root.children[0].props.onTouchEnd();
        }); 

        const t = await timer(1000);

        expect(tree).toMatchSnapshot(); 

    })

});
