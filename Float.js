//node Float -dec 279.09375
//node Float -dec 279.09373
//node Float -dec 2317*10e+5
//node Float -dec 0.203125
//node Float -dec 0.203123e-46
const arg = process.argv;
let split = {
    '0000' : '0',
    '0001' : '1',
    '0010' : '2',
    '0011' : '3',
    '0100' : '4',
    '0101' : '5',
    '0110' : '6',
    '0111' : '7',
    '1000' : '8',
    '1001' : '9',
    '1010' : 'A',
    '1011' : 'B',
    '1100' : 'C',
    '1101' : 'D',
    '1110' : 'E',
    '1111' : 'F',
}
let exceptionsDec = ['-0', '0', 'NaN', '-inf','+inf'];
let exceptionsFloat = ['80000000', '00000000', '7FC00000', 'FF800000','7F800000'];
let perform = true;
let change;
for(i = 0; i < exceptionsDec.length; ++i){
    if(arg[3] === exceptionsDec[i]) {
        perform = false;
        change = exceptionsFloat[i];
    }
}
if(arg[2] == '-dec') decToFloat(); else floatToDec();
function decToFloat() {
    if(perform == true) {
        let sta = arg[3];
        let str;
        for(i=0; i< sta.length; ++i){
            let n = sta.substring(i,i+1)
            if(n == '*'){
                let stn = sta.split('*');
                let std = sta.split('e');
                sta = stn[0] * Math.pow(10, std[std.length-1]);
            }
        }
        let sign = '';
        if (sta[0] == '-') {
            str = sta.unshift();
            sign += '1';
        } else {
            sign += '0';
            str = sta;
        }
        console.log('Number: ' + str);
        let line = (+str).toString(2);
        let a = line.split('.');
        let b = a[0];
        if (a[1] === undefined) a[1] = '';
        let summ = 0;
        if (a[0] > 1) {
            while (a[0] > 1) {
                let t = a[0].substring(a[0].length - 1,a[0].length);
                a[0] = a[0].substring(0, a[0].length - 1);
                a[1] = t + a[1];
                --summ;
            }
            while (a[1].length < 23) a[1] += '0';
        }else if (a[0] <= 0) {
                let p = a[1].substring(0, 1);
                while (p < 2) {
                    if (p == 1) {
                        a[1] = a[1].substring(1);
                        ++summ;
                        p = a[1].substring(0, 1);
                        break;
                    } else {
                        a[1] = a[1].substring(1);
                        ++summ;
                        p = a[1].substring(0, 1);
                    }
                }
        }
        if (b[0] == 0) {
            if (a[1].substring(24, a[1].length) > 0) {
                let na;
                a[1] = a[1].substring(0, 23);
                let ab = a[1];
                for (i = 0; i < ab.length; ++i) {
                    if (ab[i] == 0) na = i;
                }
                while (a[1].length < 23) a[1] += '0';
            } else {
                a[1] = a[1].substring(0, 23);
                while (a[1].length < 23) a[1] +='0';
            }
        }
        a[1] = a[1].substring(0, 23);
        let t = a[1].split('');
            summ = 127 - summ;
            let shift;
            if (summ > 0 && summ < 255) {
                shift = (+summ).toString(2);
                for(;shift.length < 8;) shift = 0 + shift;
                let number = sign + shift + a[1];
                console.log('Full number in binary system: ' + number);
                let split4 = [];
                for (let i = 0; i < number.length; i += 4) {
                    split4.push(number.slice(i, i + 4));
                }
                let n = 0;
                for (i = 0; i < split4.length; ++i) {
                    for (key in split) {
                        if (split4[i] == key) {
                            split4[i] = split[key];
                            break;
                        }
                    }
                }
                let k = '';
                for (let i = 0; i < 8; i++) {
                    k += split4[i];
                }
                console.log('Result: ' + k);
            } else if (summ < 0) console.log(exceptionsFloat[1]); else if (summ > 255){
                if(sign == '0') console.log(exceptionsFloat[4]); else console.log(exceptionsFloat[3])
            }
    } else console.log(change);
}
//node Float -float 438B8C00
//node Float -float 4510D000
//node Float -float 3E500000
//node Float -float FF700000


function floatToDec(){
    let end;
    for(i = 0; i < exceptionsFloat.length; ++i){
        if(arg[3] === exceptionsFloat[i]) {
            perform = false;
            end = exceptionsDec[i];
        }
    }
    if(perform == true) {
    let float = arg[3].split('');
    for (i = 0; i < float.length; ++i){
        for (key in split){
            if(float[i] ==split[key]) {float[i] = key;break;}
        }
    }
    let k = '';
    for (let i = 0; i < 8; i++) {k += float[i];}
    console.log('String in binary system: ' + k);
    let sign = k.substring(0, 1);
    if(sign == '-') sign = '-'; else sign = '';
    shift = k.substring(1);
    let main = shift.substring(8, shift.length);
    let end = shift.substring(8, shift.length);
    console.log('The main part: '+main);
    shift = shift.substring(0, 8);
    shift = parseInt(shift, 2);
    shift -= 127
    let general = '1';
    let NaN = '';
    if(shift > 0) {
        for(let i = 0; i < shift; ++i) {
            general = general + main.substring(0, 1);
            main = main.substring(1);
        }
    }else {for(let i = -1; i > shift; --i) {general = 0 + general;}}
    let x = 0;
    let decimal;
    if(shift >  0) { decimal =end.substring(general.length-1, end.length);}
    else { decimal = general + end.substring(0, end.length);}
    if(shift <  0) general = 0;
    let decimalDelete = decimal.substring(0, decimal.length);
    let m = '';
    for(let i = 0; i < decimal.length ; ++i) {
        m = decimalDelete.substring(0, 1);
        if(m == 0 ) {decimalDelete = decimalDelete.substring(1);++x;} else if(m == 1)
        {x= 0;decimalDelete = decimalDelete.substring(1);}
    }
    decimal = decimal.substring(0, decimal.length - x);
    let theEnd = 0;
    for(let i = 0; i < decimal.length; ++i){
        theEnd = theEnd  + decimal[i]*Math.pow(2,  -1-i);
    }
    let theTheEnd  = sign + general;
    theTheEnd = parseInt(theTheEnd , 2) - -theEnd;
    console.log('Result: ' + theTheEnd);
    }else console.log(end);
}