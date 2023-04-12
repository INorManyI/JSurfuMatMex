//Given a non-negative integer K. Write it down in the Fibonacci number system.

// node НазваниеФайла "5"

const arg = process.argv;
let tT = '';
for(i = 2; i < arg.length; ++i) {
    tT = tT + arg[i];
}
let app = new Array();
let input = tT.split(' ');
function fib(n) {
    let a = 1;
    app.push(a)
    let b = 1;
    for (let i = 3; i <= n; i++) {
        c = a + b;
        app.push(c)
        a = b;
        b = c;
    }
    return b;
}
fib(Number(input)+ 1); // 2
while(app[app.length - 1] > Number(input)){
    app.pop()
}
app1 = 0
i = 0
while(Number(input) != Number(app1)) {
    ++i
    if(app1 + app[app.length - i] <= input) {
        app1 = app[app.length - i] + app1
        app[app.length - i] = 1
    } else app[app.length - i] = 0

}
for(;i < app.length;++i) {
    app[app.length - i-1] = 0
}
app.reverse();
console.log(app.join(''))