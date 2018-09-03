var readline = require('readline');

var input = [];

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.prompt();

rl.on('line', function (cmd) {

	input.push(cmd);
});

rl.on('close', function (cmd) {

    arrayClockWise(input);
	process.exit(0);
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