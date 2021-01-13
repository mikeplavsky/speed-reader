/**
 * @jest-environment jsdom
 */

import * as React from "react";
import {render,screen,act} from "@testing-library/react";
import useClipboard from '../hooks/useClipboard';
import { Text } from "react-native";

const AState = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
};

const AClipboard = {
    getString: jest.fn()
};

jest.useFakeTimers();

function TestC () {

    const [text, toggleIt] = useClipboard(
        AState,
        AClipboard);

    return <div onClick={toggleIt}>{text}</div>

}

test("timer works",async () => {

    AClipboard.getString.mockImplementation(
        async () => "Here is a very cool string" ); 

    render(<TestC/>);

    const txt = await screen.findByText("Here");
    expect(txt.textContent).toBe("Here");    

    act(() => {
        txt.click();
        jest.advanceTimersByTime(185);
    });

    expect(txt.textContent).toBe("is");    

    act(() => {
        jest.advanceTimersByTime(185);
    });

    expect(txt.textContent).toBe("very");    

    act(() => {
        txt.click();
        jest.advanceTimersByTime(185);
    });

    expect(txt.textContent).toBe("very");    

    expect(setInterval).toBeCalledTimes(1);
    expect(clearInterval).toBeCalledTimes(1);
    
});
