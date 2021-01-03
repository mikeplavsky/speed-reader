import renderer from 'react-test-renderer';

describe("App", () => {
    it ("renders", () => {
       const tree = renderer.create('<App1/>').toJSON(); 
       console.log(tree);
    })
});
