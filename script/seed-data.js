const frontendFlashcardData = [
  {
    question: 'Test Question?',
    answer: 'Test Answer',
    type: 'frontend'
  },
  {
    question: `What is event delegation?`,
    answer: `Event delegation is a technique involving adding event listeners to a parent element instead of adding them to the descendant elements. The listener will fire whenever the event is triggered on the descendant elements due to event bubbling up the DOM. The benefits of this technique are:

    Memory footprint goes down because only one single handler is needed on the parent element, rather than having to attach event handlers on each descendant.

    There is no need to unbind the handler from elements that are removed and to bind the event for new elements.
    `,
    type: 'frontend'
  },
  {
    question: `Explain how 'this' works in JavaScript`,
    answer: `
      1. If the new keyword is used when calling the function, this inside the function is a brand new object.
      2. If apply, call, or bind are used to call/create a function, this inside the function is the object that is passed in as the argument.
      3. If a function is called as a method, such as obj.method()—this is the object that the function is a property of.
      4. If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, this is the global object. In a browser, it is the window object. If in strict mode ('use strict'), this will be undefined instead of the global object.
      5. If multiple of the above rules apply, the rule that is higher wins and will set the this value.
      6. If the function is an ES2015 arrow function, it ignores all the rules above and receives the this value of its surrounding scope at the time it is created.
    `,
    type: 'frontend'
  },
  {
    question: 'Explain how prototypal inheritance works',
    answer: `All JavaScript objects have a prototype property, that is a reference to another object. When a property is accessed on an object and if the property is not found on that object, the JavaScript engine looks at the object's prototype, and the prototype's prototype and so on, until it finds the property defined on one of the prototypes or until it reaches the end of the prototype chain.`,
    type: 'frontend'
  },
  {
    question: 'What do you think of AMD vs CommonJS?',
    answer: `Both are ways to implement a module system, which was not natively present in JavaScript until ES2015 came along. CommonJS is synchronous while AMD (Asynchronous Module Definition) is obviously asynchronous. CommonJS is designed with server-side development in mind while AMD, with its support for asynchronous loading of modules, is more intended for browsers.`,
    type: 'frontend'
  },
  {
    question: `Explain why the following doesn't work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?`,
    answer: `IIFE stands for Immediately Invoked Function Expressions. The JavaScript parser reads function foo(){ }(); as function foo(){ } and ();, where the former is a function declaration and the latter (a pair of brackets) is an attempt at calling a function but there is no name specified, hence it throws Uncaught SyntaxError: Unexpected token ).

    Here are two ways to fix it that involves adding more brackets: (function foo(){ })() and (function foo(){ }()). These functions are not exposed in the global scope and you can even omit its name if you do not need to reference itself within the body.`,
    type: 'frontend'
  },
  {
    question: `Whats the difference between a variable that is: null, undefined or undeclared?`,
    answer: `
    Undeclared variables are created when you assign a value to an identifier that is not previously created using var, let or const. Undeclared variables will be defined globally, outside of the current scope. In strict mode, a ReferenceError will be thrown when you try to assign to an undeclared variable. Undeclared variables are bad just like how global variables are bad. Avoid them at all cost! To check for them, wrap its usage in a try/catch block.

    A variable that is undefined is a variable that has been declared, but not assigned a value. It is of type undefined. If a function does not return any value as the result of executing it is assigned to a variable, the variable also has the value of undefined. To check for it, compare using the strict equality (===) operator or typeof which will give the 'undefined' string. Note that you should not be using the abstract equality operator to check, as it will also return true if the value is null.

    A variable that is null will have been explicitly assigned to the null value. It represents no value and is different from undefined in the sense that it has been explicitly assigned. To check for null, simply compare using the strict equality operator. Note that like the above, you should not be using the abstract equality operator (==) to check, as it will also return true if the value is undefined.
    `,
    type: 'frontend'
  },
  {
    question: `What is closure?`,
    answer: `A closure is the combination of a function and the lexical environment within which that function was declared. The word "lexical" refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Closures are functions that have access to the outer (enclosing) function's variables—scope chain even after the outer function has returned. Mainly used for data privacy or partial applications.`,
    type: 'frontend'
  },
  {
    question: `Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?`,
    answer: `A forEach iterates through the elements in an array, executes a callback for each element, does not return a value. While map iterates through the elements in an array and "maps" each element to a new element by calling the function on each element, creating a new array as a result.`,
    type: 'frontend'
  },
  {
    question: `What's a typical use case for anonymous functions?`,
    answer: `They can be used in IIFEs to encapsulate some code within a local scope so that variables declared in it do not leak to the global scope. As a callback that is used once and does not need to be used anywhere else. The code will seem more self-contained and readable when handlers are defined right inside the code calling them, rather than having to search elsewhere to find the function body (i.e. setTimeout). Arguments to functional programming constructs or Lodash (similar to callbacks).`,
    type: 'frontend'
  },
  {
    question: `Explain Function.prototype.bind`,
    answer: 'The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.',
    type: 'frontend'
  },
  {
    question: `When would you use document.write()`,
    answer: 'document.write() writes a string of text to a document stream opened by document.open(). When document.write() is executed after the page has loaded, it will call document.open which clears the whole document (<head> and <body> removed!) and replaces the contents with the given parameter value. Hence it is usually considered dangerous and prone to misuse.',
    type: 'frontend'
  },
  {
    question: `What's the difference between feature detection, feature inference, and using the UA string?`,
    answer: `Feature detection involves working out whether a browser supports a certain block of code, and running different code depending on whether it does (or doesn't), so that the browser can always provide a working experience rather crashing/erroring in some browsers.

    Feature inference checks for a feature just like feature detection, but uses another function because it assumes it will also exist.

    This is a browser-reported string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. It can be accessed via navigator.userAgent. However, the string is tricky to parse and can be spoofed. `,
    type: 'frontend'
  },
  {
    question: `Explain Ajax in as much detail as possible.`,
    answer: `Ajax (asynchronous JavaScript and XML) is a set of web development techniques using many web technologies on the client side to create asynchronous web applications. With Ajax, web applications can send data to and retrieve from a server asynchronously (in the background) without interfering with the display and behavior of the existing page. By decoupling the data interchange layer from the presentation layer, Ajax allows for web pages, and by extension web applications, to change content dynamically without the need to reload the entire page. In practice, modern implementations commonly substitute use JSON instead of XML, due to the advantages of JSON being native to JavaScript.`,
    type: 'frontend'
  },
  {
    question: `What are the advantages and disadvantages of using Ajax?`,
    answer: `Advantages: Better interactivity. New content from the server can be changed dynamically without the need to reload the entire page. Reduce connections to the server since scripts and stylesheets only have to be requested once. State can be maintained on a page. JavaScript variables and DOM state will persist because the main container page was not reloaded. Basically most of the advantages of an SPA.

    Disadvantages: Dynamic webpages are harder to bookmark. Does not work if JavaScript has been disabled in the browser. Some webcrawlers do not execute JavaScript and would not see content that has been loaded by JavaScript. Basically most of the disadvantages of a SPA.`,
    type: 'frontend'
  },
  {
    question: `Explain how JSONP works (and how it's not really Ajax).`,
    answer: `JSONP (JSON with Padding) is a method commonly used to bypass the cross-domain policies in web browsers because Ajax requests from the current page to a cross-origin domain is not allowed.

    JSONP works by making a request to a cross-origin domain via a <script> tag and usually with a callback query parameter, for example: https://example.com?callback=printData. The server will then wrap the data within a function called printData and return it to the client.`,
    type: 'frontend'
  },
  {
    question: `Explain "hoisting"`,
    answer: `Hoisting is a term used to explain the behavior of variable declarations in your code. Variables declared or initialized with the var keyword will have their declaration "moved" up to the top of the current scope, which we refer to as hoisting. However, only the declaration is hoisted, the assignment (if there is one), will stay where it is.`,
    type: 'frontend'
  },
  {
    question: `Describe event bubbling`,
    answer: `When an event triggers on a DOM element, it will attempt to handle the event if there is a listener attached, then the event is bubbled up to its parent and the same thing happens. This bubbling occurs up the element's ancestors all the way to the document. Event bubbling is the mechanism behind event delegation.`,
    type: 'frontend'
  },
  {
    question: `What's the difference between an "attribute" and a "property"?`,
    answer: `Attributes are defined on the HTML markup but properties are defined on the DOM. `,
    type: 'frontend'
  },
  {
    question: `Why is extending built-in JavaScript objects not a good idea?`,
    answer: `Extending a built-in/native JavaScript object means adding properties/functions to its prototype. While this may seem like a good idea at first, it is dangerous in practice. Imagine your code uses a few libraries that both extend the Array.prototype by adding the same contains method, the implementations will overwrite each other and your code will break if the behavior of these two methods is not the same.

    The only time you may want to extend a native object is when you want to create a polyfill, essentially providing your own implementation for a method that is part of the JavaScript specification but might not exist in the user's browser due to it being an older browser.`,
    type: 'frontend'
  },
  {
    question: `Difference between document load event and document DOMContentLoaded event?`,
    answer: `
    The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

    window's load event is only fired after the DOM and all dependent resources and assets have loaded.`,
    type: 'frontend'
  },
  {
    question: `What is the difference between == and ===?`,
    answer: `== is the abstract equality operator while === is the strict equality operator. The == operator will compare for equality after doing any necessary type conversions. The === operator will not do type conversion, so if two values are not the same type === will simply return false. `,
    type: 'frontend'
  },
  {
    question: `Explain the same-origin policy with regards to JavaScript.`,
    answer: `The same-origin policy prevents JavaScript from making requests across domain boundaries. An origin is defined as a combination of URI scheme, hostname, and port number. This policy prevents a malicious script on one page from obtaining access to sensitive data on another web page through that page's Document Object Model.`,
    type: 'frontend'
  },
  {
    question: `Why is it called a Ternary expression, what does the word "Ternary" indicate?`,
    answer: `Ternary indicates three, and a ternary expression accepts three operands, the test condition, the "then" expression and the "else" expression. Ternary expressions are not specific to JavaScript and I'm not sure why it is even in this list.`,
    type: 'frontend'
  },
  {
    question: `What is "use strict";? What are the advantages and disadvantages to using it?`,
    answer: `'use strict' is a statement used to enable strict mode to entire scripts or individual functions. Strict mode is a way to opt into a restricted variant of JavaScript. Advantages: Makes it impossible to accidentally create global variables. Makes assignments which would otherwise silently fail to throw an exception. Makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect). Requires that function parameter names be unique.
    this is undefined in the global context. It catches some common coding bloopers, throwing exceptions. It disables features that are confusing or poorly thought out.
    Disadvantages: Many missing features that some developers might be used to. No more access to function.caller and function.arguments. Concatenation of scripts written in different strict modes might cause issues.`,
    type: 'frontend'
  },
]

const packData = [
  {
    name: 'frontend',
  },
  {
    name: 'react',
  },
  {
    name: 'redux',
  },
  {
    name: 'express',
  },
  {
    name: 'sequelize',
  }
]

const userData = [
  {email: 'cody@email.com', password: '123', isAdmin: false},
  {email: 'murphy@email.com', password: '123', isAdmin: false},
  {email: 'admin@candy.com', password: 'candy', isAdmin: true},
]

module.exports = {
  frontendFlashcardData,
  userData,
  packData
}
