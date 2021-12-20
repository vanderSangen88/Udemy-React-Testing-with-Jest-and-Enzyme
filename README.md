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

```
npm install --save-dev babel-plugin-react-remove-properties
```

```
npm run eject
```

Select yes
