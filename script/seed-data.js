const flashcardData = [
  {
    question: 'What is event delegation?',
    answer: 'Event delegation is a technique involving adding event listeners to a parent element instead of adding them to the descendant elements.'
  },
  {
    question: 'Whats the difference between a variable that is: null, undefined or undeclared?',
    answer: 'Undeclared variables are created when you assign a value to an identifier that is not previously created using var, let or const. A variable that is undefined is a variable that has been declared, but not assigned a value. A variable that is null will have been explicitly assigned to the null value.'
  },
  {
    question: 'What is closure?',
    answer: 'A closure is the combination of a function and the lexical environment within which that function was declared.'
  },
  {
    question: 'Explain Function.prototype.bind',
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
