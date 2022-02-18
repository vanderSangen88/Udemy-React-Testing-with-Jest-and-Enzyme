# Udemy-React-Testing-with-Jest-and-Enzyme

## Section 1: Introduction to Jest, Enzyme and TDD

### 1. Welcome and introduction

Use testing to improve React code.

- Better organization
- More maintainable
- Fewer bugs

#### Prerequisites

- JavaScript
- Basic React (optinal Redux)
- Very basic git

### 2. TDD: What and Why

TDD (Test-Driven Development): write tests before writing code.

1. Write "shell" function
2. Write tests
3. Tests fail
4. Write code
5. Tests pass

#### Why TDD?

- More efficient
  - Re-run tests "for free" after changes
- Better code
  - Better organized (plan before you code)
  - More testable (no rewriting code for tests)
  - Fewer bugs (caught sooner, regression)
  - Great code coverage

### 3. create-react-app

```
npx create-react-app
```

### 6. Demo of Jest Watch Mode

```
npm test
```

### 7. More about Jest Watch Mode, Test Files and Tests

By default Watch Mode only watches for changes since the last commit.

It will look for files in the "src"-directory and subdirectories ending with ".test.js"

### 8. Enzyme vs. React Testing Library

- Both libraries create a virtual DOM
- Mostly philosophical differences (the way you should test)

- Enzyme supports isolated testing
  - e.g. shallowed rendering
- React Testing Library strongly prefers functional testing
  - Interacting as a user would

#### Why to choose Enzyme

- More traditional testing style

  - Tests tightly coupled with code
  - Unit tests are very isolated
  - Tests are easy to diagnose

- Functional user flow tests (with Testing Library)
  - More resilient to refactors
  - Difficult to diagnose

> Note: code-based testing is possible but not recommended.

#### Breaking news - blog:

[Testing React: A convert’s journey from Enzyme to Testing Library](https://bonniedotdev.medium.com/70f85eebb674)

#### Shallow Rendering

- Rendering components only one level deep
- Render parent, but use placeholders for children

_shallow:_

```js
<div id="word-input-form">
  <p>Enter word here</p>
  <InputComponent />
  <SubmitComponent />
</div>
```

vs
_mount:_

```js
<div id="word-input-form">
  <div>
    <span>Enter some text</span>
    <input type="text">
  </div>
  <button type="submit">
    Submit
  </button>
</div>
```

### 10. Enzyme Introduction & Setup

```
npm i --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17
```

_in App.test.js:_

```js
...
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({
  adapter: new EnzymeAdapter()
});
```

### 11. Using Enzyme in a Test

_in App.test.js:_

```js
import Enzyme, { shallow } from "enzyme";
...
test("renders without crashing", () => {
  const wrapper = shallow(<App />);
  console.log(wrapper.debug());
})
```

### 12. Jest Assertions

_in App.test.js:_

```js
...
test("renders non-empty component without crashing", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists()).toBe(true);
})
```

### 13. Types of Tests

- Unit tests
  - Tests one piece of code (usually one function)
- Integration tests
  - How multiple units work together
- Acceptance / End-to-end (E2E) Tests
  - Uses actual browser and connections to server
- Functional Tests
  - Can be any of the above; focuses on user flow

### 14. Testing Tradeoffs

#### Test Behavior, not Implementation

- Ideally, do not want to re-write tests after a refactor
- Keep in mind when writing tests
- Test behavior (what the app should do)
  - instead of implementation (how it works)
- Then, if implementation changes, tests remain the same
  - Testing implementation is brittle (easily broken when app still works)

#### Art, not Science

- Sometimes you'll optimize for ease of diagnosis
- Sometimes you'll optimize for less brittle tests
- Find your own balance between the two!
  - You and your team will determine what works best for you

### 15. Why There is no Snapshot Testing in this Course

#### Snapshot Testing

- Jest includes "snapshot testing"
  - A way to "freeze" a component
  - Test fails if there are any changes

#### No Snapshots Here

- No TDD
- Brittle (any change to component will break)
- Difficult to diagnose
  - Too easy to ignore failure and update
- No test intent
  - If there is a failure, does code still meet spec?

## Section 2: Simple React App: Click Counter

### 19. data-test attributes

- data-test attribute to test rendering
  - top level element of component
- Not just any component rendered!
- Why new attribute? Why not id or class?
  - id and class have uses in production app
  - Might get changed in future
  - data-test is only for testing
  - conventional, but you could choose any name
- Don't want in production? See future lecture.

### 21. Removing data-test Attributes for Production

1.

```
npm install --save-dev babel-plugin-react-remove-properties
```

2.

```
npm run eject
```

3. Select yes

4. Add plugin to babel-config in package.json

```json
"env": {
  "production": {
    "plugins": [[
      "react-remove-properties", {
        "properties": ["data-test"]
      }
    ]]
  }
},
```

### 24. Strategies and Design Decisions

#### DRY pros and cons

- DRY = Don't Repeat Yourself
- Goals for test code not the same as for production code
- Want failing tests to be easy to diagnose
- Sometimes this means repeated code
- Balance between DRY and easily diagnosed tests

#### One expect per test

- Test descriptions provide better documentation
- Failure counts give better indication of state of code
  - Test stops at first failure
- Can use `beforeEach()` for common setup

### 25. Test Initial Counter Display

- Test text displayed on page
  - Not state value
  - Testing behavior, not implementation
- The plan: counter value will be in `<span>`
- Use Enzyme `.text()`-method

### 26. Don't find too early!

- Elements are unreliable after wrapper has changed

## Section 3: Jotto Intro and Congrats Component

### 33. Set up Jotto App and Congrats Component

> Jest watchmode will only run files that have updated since the last commit.

## Section 4: GuessedWords Component

## Section 5: Input Component: useState and state-controlled input field

### 56. Mocking React Methods

#### Method for Mocking Methods in Jest

- Reset properties on React module to replace methods with mocks
- **no destructuring on imports** in non-test code

Mocking useState ❌

```jsx
import { useState } from "react";

const [state, setState] = useState();
```

Mocking useState ✅

```jsx
import React from "react";

const [state, setState] = React.useState();
```

### 57. Prepare Input Component for useState Tests

- Local state for Input called "currentGuess" with "useState" hook
- Update "currentGuess" state on field change (state-controlled)

### 58. State-Controlled Field Tests and Code

```js
describe("state controlled input field", () => {
  test("state updates with value of input box upon change", () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
});
```

### 59. Common Questions about Mocking React Methods

- Destructure useState on import

```js
...
// mock entire module for destructuring useState on import
const mockSetCurrentGuess = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState) => [initialState, mockSetCurrentGuess]
}));

describe("state controlled input field", () => {
  test("state updates with value of input box upon change", () => {
    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
});
```

- Multiple useState statements?
  - useReducer (go to 115)

### 60. Clearing State-Controlled Field on Submit

```js
let mockSetCurrentGuess = jest.fn();
let wrapper;
let originalUseState;

beforeEach(() => {
  mockSetCurrentGuess.mockClear();
  originalUseState = React.useState;
  React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
  wrapper = setup();
});

afterEach(() => {
  React.useState = originalUseState;
});

test("field is cleared upon submit button click", () => {
  const submitButton = findByTestAttr(wrapper, "submit-button");

  submitButton.simulate("click", { preventDefault() {} });
  expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
});
```

### 61. Testing Input Render for 'success' as 'true' or 'false'

### 62. 'getLetterMatchCount' Helper Function

## Section 6: Functional Tests

### 63. Introduction to Functional Tests, and update App Component

They look at a user flow. It's independent of implementation. Can be used for Redux or Context.

### 64. Set up Functional Tests

- True testing of behavior
- The only change will be in the `setup` function
- Initial state: props to send to components:
  - success
  - secretWord
  - guessedWords

### 65. First Functional Test: Submit Goes with No Previous Guesses

### 66. Code Quiz! Functional Tests for "Some Words Guessed" and "Correct Guess"

### 67. Jest methods: .only() .skip() and .todo()

- Jest methods on test and describe

- .only: only run test/describe with .only specified

- .skip: don't run any test/describe with .skip specified

- Good for isolating tests or skipping tests
  - filter out irrelevant tests results until you're ready for them
  - for tests to remind yourself to write: .todo()

## Section 7: Testing Axios

### 68. 'secretWord' Plan

- getSecretWord in both Context and Redux implementations
  - Actual function slightly different
  - Both functions will call `axios`
- Test code using `moxios` is the same
- Will fill in individual code in the relevant sections

### 69. 'moxios': Why and How

#### Why moxios?

- Random word server is necessary for actual app
- Do not want to test server when testing app
- Using moxios lets us test app
  - Without testing server
  - Without even running server

#### How moxios works

- Test installs moxios

  - axios will now send requests to moxios instead of http
  - Test specifies moxios response

- Test calls action creater
- Action creater calls axios
  - axios uses moxios instead of http for request
- Action creator receives moxios request from axios

#### moxios Syntax

- Test calls moxios.install()

  - Sets moxios as the axios adapter
  - Routes axios calls to moxios instead of http

- Can pass axios Instance to moxios.install()
  - Use your configured settings

#### moxios.wait()

- Call moxios.wait() during test
- Watches for axios calls
- Sends response using the callback passed to .wait()

```js
moxios.wait(() => {});
```

#### Sending a response

- In moxios.wait() callback
  - Access most recent request
  - Send response using the callback passed to .wait()

```js
moxios.wait(() => {
  const request = moxios.requests.mostRecent();
  request.responsdWith({
    status: 200,
    response: secretWord,
  });
});
```

### 70. Set up `getSecretWord` Action and Tests

1. Run `npm i axios`
2. Run `npm i -D moxios`

### 71. Testing Async Actions

#### Testing asynchronous functions

- getSecretWord returns promise
- Put assertion in .then() callback after running getSecretWord()
  - Assertion will run after promise resolves

#### So Much Asynchronicity!

- moxios.wait() is also asynchronous
- More important than ever to see tests fail
- Very easy for tests to complete before async

#### Tests can pass even though assertion fails

- Test function starts async call

  - Exits **before** promise resolves

- Assertion runs after promise resolves
  - After test has already passed

### 72. Write 'getSecretWord' Action

### 73. Asynchronous Action and Moxios Summary

#### Asynchronous function Testing

- Return getSecretWord() call in test
  - Test won't finish before promise resolves
- Call assertion in .then() callback
  - Won't run until getSecretWord() promise resolves
- Be careful to see tests fail

#### moxios

- Configure axios adapter to moxios, not http
- axios sends requests to moxios
- write moxios response to mimic server response

## Section 8: Get Secret Word on App Mount: Mocking Modules and Testing 'useEffect'

### 74. Mocking Modules with Jest

#### Mocking Modules in Jest

- Before, we mocked pieces of modules individually: React.useState
- That was done test-file-by-test-file

  - reasonable: sometimes wanted to mock, sometimes didn't

- We are going to want to mock the getSecretWord action everywhere

  - never want to go across the network except maybe for e2e

- For this: mock the module globally

#### Mock files for global mocks

- Global mock file can be used by any tests file
- Located in directory with special name: "** mocks **"
- Useful if you want to mock every time (or almost every time)
- Test file imports from mocks file instead of actual module

#### Location of ** mocks ** folder

- For any node module
  - At the same level as the node_modules folder
- For project modules
  - At the same level as the module

#### Different Behavior for Node Modules

- ** mocks ** file that provide mocks
  - mocking a node module (for example, 'react')
    - mocks automatically unless you explicitly unmock
  - mocking a project module
    - will not mock unless you explicitly mock

#### Mocking with create-react-app

- Issue with location of node modules

- Mocks reset automatically before each test
  - a problem if you've specified a return value!

### 75. Using useEffect to Get Secret Word on App Mount

#### useEffect

- React hook that runs function on component reload
- Be default, runs on every reload
  - or specify to re-run only when certain value change
- "re-run when empty array changes" = run only on mount
  - equivalent of componentDidMount

#### getSecretWord runs on App mount

- Use mount
  - useEffect not called on shallow
- Mock module containing getSecretWord
  - set up global mock to avoid network calls in tests
- Clear mock using .mockClear()
  - mock tracks calls cumulatively until reset

#### getSecretWord does not run on App update

- secretWord should not update on App update
  - evil game -- word changes on every guess
- Note: not testing that React's useEffect hook works properly
  - That React's job
- Testing that we're using it properly
- Will trigger update with Enzyme setProps()
  - update() doesn't trigger useEffect()
    - issue: https://github.com/enzymejs/enzyme/issues/2254

### 76. Mocking the actions Module

### 77. Testing that useEffect is Called on App Mount, Not Called on App Update

### 78. Write useEffect Code to Pass Tests

### 79. Choice point: ~~Redux~~ or React Context

#### Intro to Shared State

- Shared State is used for props needed by lots of components
  - Global settings (language, visual theme)
  - Deeply nested components need access but ancesters don't

#### React Context vs. Redux

- Simple apps: Context works great
- Redux has better tools for more sophisticated apps
  - optimization for high frequency updates
  - rich ecosystem for developers
    - tools for debugging
  - middleware for automatic code upon any action
    - for example, logging events to analytics pipelines

#### Note on Artifice

- Jotto too simple to need shared state
- Only two levels of components
  - keep state at App level
  - pass state and setters as props
- Simple app for learning
  - shared state is artifical

---

# React Context

## Section 12: React Context Testing Introduction and Update 'getSecretWord'

### 110. Introduction to React Context

#### React Context

- Context is another option for shared state

  - less complicated than Redux
  - less powerful / fewer tools

- In this course:
  - Language context
  - Context for Jotto specific state
    - e.g. whether the word has been guessed successfully

#### Using a Context

- Components that use a context need to be wrapped in a provider
- The context value is passed to the provider as a prop
- Provider will update children when value changes
  - Value can be local state for parent component
  - Pattern to embed state into context (custom hook)

### 111. Jotto Data Flow with Context

#### Context Architecture

- App

  - SecretWord state
  - Language state

  - LanguageProvider

    - LanguagePicker

      - setLanguage prop
      - languageContext (get)

    - SuccessProvider

      - Congrats

        - languageContext (get)
        - successContext (get)

      - GuessedWordsProvider

        - Input

          - secretWord prop
          - successContext (get/set)
          - languageContext (get)
          - currentGuess state
          - guessedWordsContext (get/set)

        - GuessedWords
          - languageContext (get)
          - guessedWordsContext (get)

### 112. Jotto Context Plan of Attack

- App, Input, Congrats, GuessedWords components already started
- Update App to add getSecretWord return value to local state
- Context using value prop
  - Language context (using App-level state)
- Context with embedded state
  - Success
  - GuessedWords

### 113. Update 'getSecretWord' Tests for Context Implementation

### 114. Update 'getSecretWord' Code for Context Implementation

### 115. Intro to 'useReducer' Hook

### 116. Refactor App State with 'useReducer' Hook

### 117. Loading Spinner Planning and 'describe.each()'

### 118. Test and Code Loading Spinner
