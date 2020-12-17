const testArray =  [100,333,1000,5000,69];

const min = d3.min(testArray, el => el);		// 69       
const max = d3.max(testArray, el => el);   // 5000         
const mean = d3.mean(testArray, el => el);  // 1300.4

console.log(min, max, mean)


