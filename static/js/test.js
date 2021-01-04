console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
console.log(3);
Promise.resolve(4).then(b => {
  console.log(b);
})
console.log(5);


console.log([1,2,3,4,5].slice(1,-1));

let a = {c:1}
let b = a
a = 1
b.c = 2
console.log('giao',a.c);