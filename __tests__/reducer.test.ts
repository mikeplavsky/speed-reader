import { wordsReducer } from "../hooks/useClipboard";

test("it returns state by default", () => {
  const state = { a: 12 };
  const res = wordsReducer(state, { type: "" });

  expect(res).toBe(state);
});

test("getting next word", () => {
  const state = {
    words: ["one", "two", "three"],
    idx: 1,
  };

  const res = wordsReducer(state, { type: "NEXT" });

  expect(res).toMatchInlineSnapshot(`
    Object {
      "idx": 2,
      "reading": true,
      "text": "three",
      "words": Array [
        "one",
        "two",
        "three",
      ],
    }
  `);
});

test("stopping when already at the end", () => {
  const state = {
    words: ["one", "two", "three"],
    idx: 2,
  };

  const res = wordsReducer(state, { type: "NEXT" });

  expect(res).toMatchInlineSnapshot(`
    Object {
      "idx": 2,
      "reading": false,
      "text": "three",
      "words": Array [
        "one",
        "two",
        "three",
      ],
    }
  `);
});

test("toggle reading when index is at the end", () => {
  const state = {
    words: ["one", "two", "three"],
    idx: 2,
    reading: false,
  };

  const res = wordsReducer(state, { type: "TOGGLE" });

  expect(res).toMatchInlineSnapshot(`
    Object {
      "idx": 0,
      "reading": true,
      "text": "one",
      "words": Array [
        "one",
        "two",
        "three",
      ],
    }
  `);
});

test("simple toggle", () => {
  const state = {
    words: ["one", "two", "three"],
    idx: 1,
    reading: false,
  };

  const res = wordsReducer(state, { type: "TOGGLE" });

  expect(res).toMatchInlineSnapshot(`
    Object {
      "idx": 1,
      "reading": true,
      "text": "two",
      "words": Array [
        "one",
        "two",
        "three",
      ],
    }
  `);
});

test("it pauses reading", () => {
  const res = wordsReducer({ reading: true }, { type: "PAUSE" });
  expect(res).toStrictEqual({ reading: false });
});

test("it does not processes data if it is the same", () => {
  const data = " next string comes first";

  const res = wordsReducer(
    { data, taint: 12 },
    {
      type: "DATA",
      data,
    }
  );

  expect(res).toMatchInlineSnapshot(`
    Object {
      "data": " next string comes first",
      "taint": 12,
    }
  `);
});

test("it processes data", () => {
  const data = " next string comes first";

  const res = wordsReducer(
    {},
    {
      type: "DATA",
      data,
    }
  );

  expect(res).toMatchInlineSnapshot(`
    Object {
      "data": " next string comes first",
      "idx": 0,
      "reading": false,
      "text": "next",
      "words": Array [
        "next",
        "string",
        "comes",
        "first",
      ],
    }
  `);
});
