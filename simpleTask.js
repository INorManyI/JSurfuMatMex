//https://contest.yandex.ru/contest/48640/problems/B/
//Given 3 positive integers. It is necessary to check the divisibility of these numbers by 2, 3 and 5. And print the numbers in the following order: 1) A number that is divisible only by 2 and 3; 2) A number that is divisible only by 2 and 5; 3) A number that is divisible only by 3 and 5.
// node НазваниеФайла "6 10 15"
//var startTime = performance.now()
const arg = process.argv;
let tT = '';
for(i = 2; i < arg.length; ++i) {
    tT = tT + arg[i];
}

let input = tT.split(' ');
dividedTwo = ""
dividedThree = ""
dividedFive = ""
for(i= 0; i < input.length; ++i) {
    two = (+input[i]).toString(2);
    if(two.substr(two.length - 1) === "0") {
        dividedTwo = input[i];
    }
    three = (+input[i]).toString(3);
    if(three.substr(three.length - 1) === "0") {
        dividedThree = input[i];
    }
    five = (+input[i]).toString(5);
    if(five.substr(five.length - 1) === "0") {
        dividedFive = input[i];
    }
    if(dividedTwo ==  input[i] && dividedThree ==  input[i]){
        logOne = input[i]
    }
    if(dividedTwo ==  input[i] && dividedFive ==  input[i]) {
        logTwo = input[i]
    }
    if(dividedFive ==  input[i] && dividedThree ==  input[i]){
        logThree  = input[i]
    }

}
console.log(logOne+ " " + logTwo + " " + logThree)
//var endTime = performance.now()

//console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
