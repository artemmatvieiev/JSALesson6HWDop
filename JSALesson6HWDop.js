/* создать функцию, которая будет принимать генератор и возвращать массив значений, которые yield-ит генератор, но не больше 100 значений:
function getValuesFromGenerator ...

getValuesFromGenerator(function* () {
  yield 5;
  yield 15;
  yield 25;
});
--> [5, 15, 25]

getValuesFromGenerator(function* () {
  let i = 0;
  while (true) { yield i++; }
});
--> [0, 1, 2, 3, 4, 5, 6 ... 99]
Также предусмотреть, что в функцию может быть передано неверное значение (обычная функция, или ничего не передано). В этом случае вернуть пустой массив. */

const getValuesFromGenerator = (generator) => {
  const result = [];
  if(typeof(generator) == 'function' 
    && generator.constructor.name == 'GeneratorFunction') {
      const it = generator();
      while (result.length < 100) {
        let { value , done } = it.next();
        if (done) break;
        result.push(value);
      }
  }
  console.log(result)
}

/* Есть список урлов. Необходимо выполнить запрос ко всем ресурсам и вывести в консоль массив ответов.
Последний url в этом списке невалидный, он генерирует ошибку. Поэтому на выходе мы должны получить массив из двух массивов [users, posts] --> [ [{...}, {...}, {...}...], [ {...}, {...}, ... ] ]
Задачу можно решить через Promise.all, через async/await
 
const list = [
  'https://jsonplaceholder.typicode.com/users', 
  'https://jsonplaceholder.typicode.com/posts', 
  'https://jsonplaceholder.typicode.co/albums'
]; */

const list = [
  'https://jsonplaceholder.typicode.com/users', 
  'https://jsonplaceholder.typicode.com/posts', 
  'https://jsonplaceholder.typicode.co/albums'
];

let result =[];

list.map( async (url) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (Array.isArray(responseJson)) result.push(responseJson);
  }
  catch(err) {
    console.log(err.message);
  }
});
console.log(result);
