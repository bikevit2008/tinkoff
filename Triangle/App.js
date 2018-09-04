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
    console.log(allInput)
    var inputLines = allInput.split('\n')
    console.log(inputLines)
    let points = toPoints(inputLines);
    console.log(points)
    let perimeters = allPerimeters(points);
    console.log(perimeters)
    let max = findMax(perimeters);
    console.log(max);
    console.log(new Triangle('a', 'b', 'c'))
    let point1 = new Point(1,2)
    let point2 = new Point ()
    console.log(point1)
    console.log(point1.distance(point2))
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
            const pointB = points[B];
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
        const AB = A.distance(B);
        const BC = B.distance(C);
        const AC = A.distance(C);
        const sum = AB + BC + AC;
        return sum;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distance (point) {
        const { x: x2 = 0, y: y2 = 0} = point;
        const diffXQuadro = Math.pow(x2 - this.x, 2);
        const diffYQuadro = Math.pow(y2 - this.y, 2);
        return Math.sqrt(diffXQuadro + diffYQuadro)
    }
}
