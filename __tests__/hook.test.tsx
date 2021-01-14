/**
 * @jest-environment jsdom
 */

import * as React from "react";
import {render,screen,act,cleanup} from "@testing-library/react";
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

beforeEach(() => {
    AState.addEventListener.mockClear();
    AState.removeEventListener.mockClear();
});

test("Switching state", async () => {

    let stateChange = null; 

    AState.addEventListener.mockImplementationOnce((x,func) => {
        stateChange = func; 
    });

    AClipboard.getString.mockImplementationOnce(
        async () => "Nice and Twice" ); 
    
    render(<TestC/>);

    const txt = await screen.findByText("Nice");
    expect(txt.textContent).toBe("Nice");    

    AClipboard.getString.mockImplementationOnce(
        async () => "Twice and Nice" ); 

    await act(async () => {
        await stateChange("active");
    });

    expect(txt.textContent).toBe("Twice");    
    
});

test("AppState is used", () => {

    render(<TestC/>);
    cleanup();

    expect(AState.addEventListener).toBeCalledTimes(1);
    expect(AState.removeEventListener).toBeCalledTimes(1);
    
});

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
