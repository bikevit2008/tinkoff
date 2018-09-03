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
    var input = allInput.split('\n')
    input = input.filter((item)=>item !== undefined && item !== '')
    arrayClockWise(input);
});


const arrayClockWise = (input) => {
    let [n = 0, m = 0] = input[0].split(' ');
    n = parseInt(n);
    m = parseInt(m);
    console.log(`${m} ${n}`)
    let result = new Array(m);
    for(let i = input.length - 1; i > 0; i--){
        const inputLine = input[i];
        const lineArray = inputLine.split(' ');
        for(let j = 0; j < lineArray.length; j++){
            if(i === input.length - 1){
                result[j] = []
            }
            const arrayLine = result[j];
            result[j] = ([...arrayLine, lineArray[j]])
        }
    }
    for(let i = 0; i<result.length; i++){
        console.log(result[i].join(' '))
    }
}