/**
 * @jest-environment jsdom
 */

import * as React from "react";
import {render,screen} from "@testing-library/react";
import useClipboard from '../hooks/useClipboard';
import { Text } from "react-native";

const AState = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
};

const AClipboard = {
    getString: jest.fn()
};

function TestC () {

    const [text, toggleIt] = useClipboard(
        AState,
        AClipboard);

    return <div>{text}</div>

}

test("it hooks something",async () => {

    AClipboard.getString.mockImplementation(
        async () => "Here is a string" ); 

    render(<TestC/>);
    const txt = await screen.findByText("Here");

    expect(txt.textContent).toBe("Here");    
    
});
