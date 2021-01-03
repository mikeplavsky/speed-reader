import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

let container = null;

beforeEach(() => {
    container = document.createElement('<div>');
});


it ("can render", () => {
    act(() => {
        render("<TabOneScreen/>");
    });
});