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

    AState.addEventListener.mockImplementation((x,func) => {
        stateChange = func; 
    });

    const mockGetString = 
        x => AClipboard.getString.mockImplementation(
            () => x); 

    const mockAppState = async (x) => {

        await act(async () => {
            await stateChange(x);
        });

    } 

    mockGetString("Nice and Twice");
    
    const c = render(<TestC/>);

    const txt = await screen.findByText("Nice");
    expect(txt.textContent).toBe("Nice");    

    mockGetString("Next Text");
    await mockAppState("active");

    expect(txt.textContent).toBe("Next");    

    mockGetString("Second Text");
    await mockAppState("active");

    expect(txt.textContent).toBe("Second");    

    mockGetString("Third Text");
    await mockAppState("background");

    expect(txt.textContent).toBe("Second");    

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
