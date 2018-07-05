const flashcardData = [
  {
    question: 'Test Question?',
    answer: 'Test Answer'
  },
  {
    question: `What is event delegation?`,
    answer: `Event delegation is a technique involving adding event listeners to a parent element instead of adding them to the descendant elements. The listener will fire whenever the event is triggered on the descendant elements due to event bubbling up the DOM. The benefits of this technique are:

    Memory footprint goes down because only one single handler is needed on the parent element, rather than having to attach event handlers on each descendant.

    There is no need to unbind the handler from elements that are removed and to bind the event for new elements.
    `
  },
  {
    question: `Explain how 'this' works in JavaScript`,
    answer: `
      1. If the new keyword is used when calling the function, this inside the function is a brand new object.
      2. If apply, call, or bind are used to call/create a function, this inside the function is the object that is passed in as the argument.
      3. If a function is called as a method, such as obj.method() — this is the object that the function is a property of.
      4. If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, this is the global object. In a browser, it is the window object. If in strict mode ('use strict'), this will be undefined instead of the global object.
      5. If multiple of the above rules apply, the rule that is higher wins and will set the this value.
      6. If the function is an ES2015 arrow function, it ignores all the rules above and receives the this value of its surrounding scope at the time it is created.
    `
  },
  {
    question: 'Explain how prototypal inheritance works',
    answer: `All JavaScript objects have a prototype property, that is a reference to another object. When a property is accessed on an object and if the property is not found on that object, the JavaScript engine looks at the object's prototype, and the prototype's prototype and so on, until it finds the property defined on one of the prototypes or until it reaches the end of the prototype chain.`
  },
  {
    question: 'What do you think of AMD vs CommonJS?',
    answer: `Both are ways to implement a module system, which was not natively present in JavaScript until ES2015 came along. CommonJS is synchronous while AMD (Asynchronous Module Definition) is obviously asynchronous. CommonJS is designed with server-side development in mind while AMD, with its support for asynchronous loading of modules, is more intended for browsers.`
  },
  {
    question: `Explain why the following doesn't work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?`,
    answer: `IIFE stands for Immediately Invoked Function Expressions. The JavaScript parser reads function foo(){ }(); as function foo(){ } and ();, where the former is a function declaration and the latter (a pair of brackets) is an attempt at calling a function but there is no name specified, hence it throws Uncaught SyntaxError: Unexpected token ).

    Here are two ways to fix it that involves adding more brackets: (function foo(){ })() and (function foo(){ }()). These functions are not exposed in the global scope and you can even omit its name if you do not need to reference itself within the body.`
  },
  {
    question: `Whats the difference between a variable that is: null, undefined or undeclared?`,
    answer: `
    Undeclared variables are created when you assign a value to an identifier that is not previously created using var, let or const. Undeclared variables will be defined globally, outside of the current scope. In strict mode, a ReferenceError will be thrown when you try to assign to an undeclared variable. Undeclared variables are bad just like how global variables are bad. Avoid them at all cost! To check for them, wrap its usage in a try/catch block.

    A variable that is undefined is a variable that has been declared, but not assigned a value. It is of type undefined. If a function does not return any value as the result of executing it is assigned to a variable, the variable also has the value of undefined. To check for it, compare using the strict equality (===) operator or typeof which will give the 'undefined' string. Note that you should not be using the abstract equality operator to check, as it will also return true if the value is null.

    A variable that is null will have been explicitly assigned to the null value. It represents no value and is different from undefined in the sense that it has been explicitly assigned. To check for null, simply compare using the strict equality operator. Note that like the above, you should not be using the abstract equality operator (==) to check, as it will also return true if the value is undefined.
    `
  },
  {
    question: `What is closure?`,
    answer: `A closure is the combination of a function and the lexical environment within which that function was declared. The word "lexical" refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Closures are functions that have access to the outer (enclosing) function's variables—scope chain even after the outer function has returned. Mainly used for data privacy or partial applications.`
  },
  {
    question: `Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?`,
    answer: `A forEach iterates through the elements in an array, executes a callback for each element, does not return a value. While map iterates through the elements in an array and "maps" each element to a new element by calling the function on each element, creating a new array as a result.`
  },
  {
    question: `What's a typical use case for anonymous functions?`,
    answer: `They can be used in IIFEs to encapsulate some code within a local scope so that variables declared in it do not leak to the global scope. As a callback that is used once and does not need to be used anywhere else. The code will seem more self-contained and readable when handlers are defined right inside the code calling them, rather than having to search elsewhere to find the function body (i.e. setTimeout). Arguments to functional programming constructs or Lodash (similar to callbacks).`
  },
  {
    question: `Explain Function.prototype.bind`,
    answer: 'The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.'
  },
]

const userData = [
  {email: 'cody@email.com', password: '123', isAdmin: false},
  {email: 'murphy@email.com', password: '123', isAdmin: false},
  {email: 'admin@candy.com', password: 'candy', isAdmin: true},
]

module.exports = {
  flashcardData,
  userData
}
