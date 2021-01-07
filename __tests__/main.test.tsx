import React from 'react';
import TestRenderer from 'react-test-renderer';

import TabOneScreen from '../screens/TabOneScreen';

describe("App", () => {

    it ("renders", () => {

        const AppState = {
            addEventListener() {}
        };    

        const tree = TestRenderer.create(
            <TabOneScreen AppState={AppState}/>); 

        expect(tree).toMatchSnapshot(); 
    })

});
