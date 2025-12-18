// function expression
const greet = function(name) {
    console.log(`Hello ${name}`);
}
greet('hubert');

//function declaration
function greet2(name) {
    console.log(`Bye ${name}`);
}
greet2('hubert');

//arrow declaration
const greet3 = name => {
    console.log(`Hey ${name}`);
}
greet3('hubert');