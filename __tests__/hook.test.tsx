import * as React from 'react';
import {render,screen} from "@testing-library/react";
import {useClipboard} from '../hooks/useClipboard';

function setup() {

    const retVal = {};

    function TestComponent() {
        Object.assign(retVal, useClipboard())
        return null; 
    }

    render(<TestComponent />);
    return retVal;

}

test("it renders",() => {
    //const res = setup();
});
