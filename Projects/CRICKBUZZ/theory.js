// setTimeout is an async function

// setTimeout(function () {
//   console.log('hi');
// }, 5000); // in microseconds

// console.log('i am first');

// async function temp() {
//   setTimeout(function () {
//     console.log('morning');
//   }, 2000);
// }
// temp();
// console.log('good');

async function temp() {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  console.log(3);
  setTimeout(function () {
    console.log(4);
  }, 1000);
}
temp();
console.log(5);
