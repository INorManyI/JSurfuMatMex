/*node Hamming 0100010000111101 100110001100001011101
*/
function checkInput(str) {
    let newStr = str.split('');
    for (let i = 0; i < newStr.length; i++)
        if (isNaN(newStr[i]) || (newStr[i] > 1)) {
            document.getElementById('errors').textContent = 'Only "1" and "0"';
            return false;
        }
    return true;
}

function code() {
    while (document.getElementById('originalMessage').value.length < 4)
        document.getElementById('originalMessage').value += '0';
    let str = document.getElementById('originalMessage').value;
    if (checkInput(str) == false)
        return;

    document.getElementById('errors').textContent = '';
    let coding = str.split('');
    let qt = 0;
    let nd = 0;
    let code = new Array(21);
    for(i = 0; i< code.length; ++i) {
        code[i] = 0;
    }
    for (let g = 0; g < code.length; g++) {
        if ((g === 0) || (g === 1) || (g === 3) || (g === 7) || (g === 15)) {
            if(coding[qt] == undefined){
            code[g] = 0;
            nd++;
            }else code[g] = 0;
        } else {
            if(coding[qt] == undefined){
            code[g] = 0;
            qt++;
            nd++;
            } else {
                code[g] = coding[qt];
                qt++;
            }
        }
    }

    let n = 0;
    for (let i = 0; i < code.length; i++) {
        if (i % 2 === 0) {
            n = n - -code[i];
        }
    }
    code[0] = n % 2;
    code[1] = (code[2] - -code[5] - -code[6] - -code[9] - -code[10] - -code[13] - -code[14] - -code[17] - -code[18]) % 2;
    code[3] = (code[4] - -code[5] - -code[6] - -code[11] - -code[12] - -code[13] - -code[14] - -code[19] - -code[20]) % 2;
    code[7] = (code[8] - -code[9] - -code[10] - -code[11] - -code[12] - -code[13] - -code[14]) % 2;
    code[15] = (code[16] - -code[17] - -code[18] - -code[19] - -code[20]) % 2;
    let strEnd = '';
    function col() {
        for (let i = 0; i < code.length; i++) {
            strEnd += code[i];
        }
    }
    col();
    strEnd = strEnd.substring(0, code.length-nd);
    document.getElementById('codedMessage').value = strEnd;
    document.getElementById('check').value = strEnd;
}
function decode() {
    let str = document.getElementById('codedMessage').value;
    if (checkInput(str) == false){

        return;
    }
    document.getElementById('errors').textContent = '';
    const decoding = str.split('');
    let decode = new Array(21);
    let nd = 0;
    for (let g = 0; g < 21; g++) {
        if ((g === 0) || (g === 1) || (g === 3) || (g === 7) || (g === 15)) {
            if(decoding[g] == undefined){
                decode[g] = 0;
                nd++;
            }else decode[g] = 0;
        } else {
            if(decoding[g] == undefined){
                decode[g] = 0;
                nd++;
            }else decode[g] = decoding[g];
        }
    }


    let n = 0;
    for (let i = 0; i < decode.length; i++) {
        if (i % 2 === 0) {
            n = n - -decode[i];
        }
    }
    decode[0] = n % 2;
    decode[1] = (decode[2] - -decode[5] - -decode[6] - -decode[9] - -decode[10] - -decode[13] - -decode[14] - -decode[17] - -decode[18]) % 2;
    decode[3] = (decode[4] - -decode[5] - -decode[6] - -decode[11] - -decode[12] - -decode[13] - -decode[14] - -decode[19] - -decode[20]) % 2;
    decode[7] = (decode[8] - -decode[9] - -decode[10] - -decode[11] - -decode[12] - -decode[13] - -decode[14]) % 2;
    decode[15] = (decode[16] - -decode[17] - -decode[18] - -decode[19] - -decode[20]) % 2;
    n = 0;
    let l = 0;
    if ((decoding[0] - -decode[0]) % 2 === 1) {
        n += 1;
        ++l;
    }
    if ((decoding[1] - -decode[1]) % 2 === 1) {
        n += 2;
        ++l;
    }
    if ((decoding[3] - -decode[3]) % 2 === 1) {
        n += 4;
        ++l;
    }
    if ((decoding[7] - -decode[7]) % 2 === 1) {
        n += 8;
        ++l;
    }
    if ((decoding[15] - -decode[15]) % 2 === 1) {
        n += 16;
        ++l;
    }
    let strEnd = new Array();
    for(i = 0; i < 21 - nd; ++i)
        strEnd[i] = decode[i];
    if(l == 0){
        document.getElementById('errors').textContent = 'No errors';
        document.getElementById('decodedMessage').value = strEnd.join('');
    }
    if (l<=2) {
        document.getElementById('errors').textContent = 'Errors in ' + n;
        document.getElementById('decodedMessage').value = strEnd.join('');
    }
    if (l>2) {
        document.getElementById('errors').textContent = 'there are 2 errors';
        document.getElementById('decodedMessage').value = strEnd.join('');
    }
}