import React from 'react';
import TestRenderer from 'react-test-renderer';

import TabOneScreen from '../screens/TabOneScreen';

describe("App", () => {

    const AppState = {
        addEventListener() {}
    };    

    it ("renders", () => {

        const tree = TestRenderer.create(
            <TabOneScreen AppState={AppState}/>); 

        expect(tree).toMatchSnapshot(); 
    });

    it ("renders text", () => {

        const tree = TestRenderer.create(
            <TabOneScreen AppState={AppState}/>); 

        const scr = tree.root.findByType(TabOneScreen);
        console.log(scr.props);
        console.log(scr.state);

    })

});
