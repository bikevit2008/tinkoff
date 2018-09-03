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
    let triangles = allTriangles(points);
    let trueTriangles = triangles.filter((item)=>item.status === true);
    console.log(triangles);
    console.log(trueTriangles);
    let resultTriangles = trueTriangles.filter((item, iterator)=>{
        for(let i = 0; i < trueTriangles.length; i++){
            if(i !== iterator){
                return !(Triangle.isEquals(item, trueTriangles[i]));
            }
        }
    })
    console.log(resultTriangles)
    let result = resultTriangles.length;
    console.log(result)
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
const allTriangles = (points) => {
    const { length } = points;
    let isoscelesArray = [];
    for (let A = 0; A < length; A++){
        const pointA = points[A];

        for (let B = 0; B < length; B++) {
            if(B !== A){
                const pointB = points[B];

                for (let C = 0; C < length; C++) {
                    if(C !== A && C !== B){
                        const pointC = points[C];
                        const triangle = new Triangle(pointA, pointB, pointC);
                        const isosceles = triangle.isosceles();
                        isoscelesArray.push({status: isosceles, triangle: triangle});
                    }
                }

            }

        }

    }
    return isoscelesArray;
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
    isosceles (){
        const { A, B, C } = this;
        const AB = Point.distance(A, B);
        const BC = Point.distance(B, C);
        const AC = Point.distance(A, C);
        let result = false;
        if (AB === BC) {
            result = true;
        }
        if (BC === AC) {
            result = true;
        }
        if (AB === AC) {
            result = true;
        }
        return result;
    }
    static isEquals (a, b){
        const { A: A1, B: B1, C: C1} = a;
        const { A: A2, B: B2, C: C2} = b;
        const triangle1 = Object.values(a);
        const triangle2 = Object.values(b);
        const results = [];
        for (let i = 0; i < 3; i++){
            const point1 = triangle1[i];
            for(let j = 0; j < 3; j++){
                const point2 = triangle2[j];
                if(point1 === point2){
                    results.push(true)
                }
            }
        }
        let result = results[0] && results[1] && results[2]
        return result;
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
