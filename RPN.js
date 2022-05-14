//node RPN --infixToPostfix  "(1+2) + (3-4) +5*(6/7) ^2"
//node RPN --infixToPostfix 1+2
//node RPN --infixToPostfix ( a + b - c )/( d + f*i)+g
//node RPN --infixToPostfix ((((a+b)-c)/(d+(f*i)))+g)

const arg = process.argv;
let order = new Array();
order['('] = 0; order[')'] = 1;
order['+'] = 2; order['-'] = 2;
order['*'] = 3; order['/'] = 3;
order['^'] = 4;
let tT = '';
for(i = 3; i < arg.length; ++i) {
    tT = tT + arg[i];
}
tT = tT.replace(/\s/g, '');
let input = tT.split('');
if(arg[2] == '--infixToPostfix') infixToPostfix(); else postfixToInfix();
function infixToPostfix() {
    let out = '';
    let ii = 0;
    let stack = new Array();
    console.log(input.join(''))
    let count = 0;
    function check(){
        for(stacks in stack) if(stack[stacks] == '(') {
            return true;
            break;
        }
    }
    function oneValue(){for(stacks in order) if(stacks == stack[stack.length- 1]) return order[stacks];}
    function twoValue(){for(stacks in order) if(stacks == input[i]) return order[stacks];}
    for(i = 0; i < input.length; ++i){
        if(check() != true){
            if((input[i] == '+' || input[i] == '-' || input[i] == '*' || input[i] == '/' || input[i] == '^')) {
                if(stack.length != 0){
                    if(oneValue() > twoValue()) {
                        out += stack[stack.length- 1];
                        stack.pop();
                        stack.push(input[i])

                    }
                    else if(oneValue() < twoValue()){
                        stack.push(input[i]);
                    } else {
                        out += stack[stack.length- 1];
                        stack.pop();
                        stack.push(input[i])
                    }
                } else{stack.push(input[i]);}
            }
        }
        if(input[i] == '(') {
            stack.push(input[i]);
            count++;

        } else  if(check()){
            if (input[i] != '+' && input[i] != '-' && input[i] != '*' && input[i] != '/' && input[i] != '(' && input[i] != ')' && input[i] != '^') out += input[i];
                else if(input[i] != ')') {
                    if(oneValue() > twoValue()) {
                        out += stack[stack.length- 1];
                        stack.pop();
                        stack.push(input[i])
                    }
                    else if(oneValue() < twoValue()){
                        stack.push(input[i]);
                    } else {
                        out += stack[stack.length- 1];
                        stack.pop();
                        stack.push(input[i])
                    }
                }
                else {
                    while(stack[stack.length -1 ] != '(') {
                        out+=stack[stack.length-1];
                        stack.pop();
                    }
                    stack.pop();
                    count--;

                }
            }
        else if (input[i] != '+' && input[i] != '-' && input[i] != '*' && input[i] != '/' && input[i] != '(' && input[i] != ')' && input[i] != '^') out += input[i];
        else if(input[i] == ')') count -= 1;
    }
    if(stack.length > 0) {
        while(stack.length != 0) {
            out+=stack[stack.length-1];
            stack.pop();
        }
    }
    if(count > 0) console.log('Нет закрывающейся скобки'); else if(count < 0) console.log('Нет открывающейся скобки'); else{
        console.log(out);
    }
}
//node RPN --postfixToInfix "12+34-+567/2^*+"
//node RPN --postfixToInfix 12+34-+567/*+
//node RPN --postfixToInfix ab+c-dfi*+/g+
//node RPN --postfixToInfix 610+4-112*+/1+
function postfixToInfix() {
    let stack = new Array();
    let summ = 0;
    let summ1 = 3;
    for(i = 0; i < input.length; ++i) {
        if (input[i] != '+' && input[i] != '-' && input[i] != '*' && input[i] != '/' && input[i] != '(' && input[i] != ')' && input[i] != '^') {
            stack.push(input[i]);
        }
        else if((input[i] == '+' || input[i] == '-' || input[i] == '*' || input[i] == '/' || input[i] == '^') &&
            (input[i-1] == '+' || input[i-1] == '-' || input[i-1] == '*' || input[i-1] == '/' || input[i-1] == '^')) {
            for(ord in order) {
                if(input[i] == ord) summ  = order[ord];
            }
            if( summ > summ1){
                let out1 = stack.pop();
                let out2 = stack.pop();
                stack.push('(' + out2+ ')' + input[i] + out1);
                summ1 = summ;
            }else if( summ == summ1){
                let out1 = stack.pop();
                let out2 = stack.pop();
                stack.push('(' + out2+ ')' + input[i] + '(' + out1+ ')');
            }else{
                let out1 = stack.pop();
                let out2 = stack.pop();
                stack.push(out2 + input[i]+  out1);
            }
        }

        else if((input[i] == '+' || input[i] == '-' || input[i] == '*' || input[i] == '/' || input[i] == '^') && stack.length> 1 &&
            (input[i-1] != '+' || input[i-1] != '-' || input[i-1] != '*' || input[i-1] != '/' || input[i-1] != '^')) {
            for(ord in order) {
                if(input[i] == ord) summ  = order[ord];
            }
            if( summ > summ1){
                let out1 = stack.pop();
                let out2 = stack.pop();
                stack.push('(' + out2+ ')' + input[i] + out1);
                summ1 = summ;
            }else if( summ == summ1){
                let out1 = stack.pop();
                let out2 = stack.pop();
                stack.push(out2+ input[i] +out1);
            }else{
                let out1 = stack.pop();
                let out2 = stack.pop();
                stack.push(out2 + input[i]+  out1);
            }
        }
        else stack.push(input[i]);
    }
    console.log(stack.join(''))
}