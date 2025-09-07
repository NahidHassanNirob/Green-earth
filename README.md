#### 1) What is the difference between var, let, and const?

ans:
var : Old way of declaring variables in JavaScript. It has function scope and you can re-declare it.
let : Modern way to declare variables. It has block scope. You can change the value, but you cannot re-declare it in the same scope.
const : it Also modern, block scope. Once you assign a value, you cannot change it.

#### 2) What is the difference between map(), forEach(), and filter()?

    ans: this all are built in array method in javaScript.
    forEach() : does something for each item in the array, does not return a new array.
    map() : does something for each item and returns a new array with the results.
    filter() : keeps only the items that pass a condition and returns a new array.

#### 3) What are arrow functions in ES6?

   ans: in ECMAScript-6, arrow function is a shorter way to write a function in JavaScript.
   Uses => instead of the function keyword.its good for writing small functions quickly.

#### 4) How does destructuring assignment work in ES6?

 ans: It’s a shortcut to get values from arrays or objects and store them in variables

#### 5) Explain template literals in ES6. How are they different from string concatenation?

ans : Template literals are a new way to write strings in JavaScript. They make it much easier to work with strings, especially when you want to include variables or create multi-line text. use `` backticks to creat template literals. and you can add variables or expressions use ${}.Can write strings in multiple lines without using \n.

string concatenation:

let name = "Nirob";
let age = 19;
let message = "Hello " + name + ", you are " + age + " years old.";
console.log(message);



template literal:

let name = "Nirob";
let age = 19;
let message = `Hello ${name}, you are ${age} years old.`;
console.log(message);







