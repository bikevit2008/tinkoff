var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});
stdin.on('end', function () {
    var allInput = inputChunks.join('');
    console.log(allInput.replace(/\d{1,13}[A-Z]/g, replacer));
});


const replacer = (str) => {
    let lastSymbol = str.match(/[A-Z]/)[0];
    let count = str.match(/\d{1,13}/)[0];
    let result = '';
    for (let i = 0; i < count; i++){
        result += lastSymbol;
    }
    return result;
}