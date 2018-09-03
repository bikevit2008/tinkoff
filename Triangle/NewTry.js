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
    var inputLines = allInput.split('\n')
    let points = toPoints(inputLines);
    let perimeters = allPerimeters(points);
    let max = findMax(perimeters);
    max = max.toPrecision(15);
    console.log(max);
});

const toPoints = (inputLines) => {
    const n = parseInt(inputLines[0]);
    let arrayPoints = [];
    for (let i = 1; i <= n; i++){
        const arrayXY = inputLines[i].split(' ');
        const x = parseInt(arrayXY[0]);
        const y = parseInt(arrayXY[1]);
        const point = new Point(x, y);
        arrayPoints.push(point);
    }
    return arrayPoints;
}
const allPerimeters = (points) => {
    const { length } = points;
    let perimeters = [];
    for (let A = 0; A < length; A++){
        const pointA = points[A];

        for (let B = 0; B < length; B++) {
            if(B !== A){
                const pointB = points[B];

                for (let C = 0; C < length; C++) {
                    if(C !== A && C !== B){
                        const pointC = points[C];
                        const triangle = new Triangle(pointA, pointB, pointC);
                        const perimeter = triangle.perimeter();
                        perimeters.push(perimeter);
                    }
                }

            }

        }

    }
    return perimeters;
}

const findMax = (array) => {
    let max = array[0];
    for(let i = 1; i < array.length; i++){
        if(max < array[i]){
            max = array[i]
        }
    }
    return max;
}
class Triangle {
    constructor(A, B, C) {
        this.A = A;
        this.B = B;
        this.C = C;
    }
    perimeter (){
        const { A, B, C } = this;
        const AB = Point.distance(A, B);
        const BC = Point.distance(B, C);
        const AC = Point.distance(A, C);
        const sum = AB + BC + AC;
        return sum;
    }
}

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }
}
