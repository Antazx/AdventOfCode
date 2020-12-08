const test = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#"
];

interface Position {
    line: number;
    column: number;
}

class Player {

    currentPosition: Position;

    constructor(initialPosition: Position) {
        this.currentPosition = initialPosition;
    }

    move(): Position {
        this.currentPosition.line += 1;
        this.currentPosition.column += 3;

        return this.currentPosition;
    }
}

class ExpandableMap {

    map: string[];

    constructor(value: string[]) {
        this.map = value;
    }

    expandMap(line:number): void {
        for(let start = line; start < this.map.length; start ++) {
            this.map[start] += this.map[start];
        }
    }

    getItemAt(position: Position): string {
        if(position.column >= this.map[position.line].length) this.expandMap(position.line);
        return this.map[position.line].charAt(position.column);
    }
}

const initialPosition = {line: 0, column: 0};
const player = new Player(initialPosition);
const map = new ExpandableMap(test);
let nodes = "";

while(player.currentPosition.line < map.map.length){
    console.log(`Player at ${player.currentPosition.line},${player.currentPosition.column} on ${map.getItemAt(player.currentPosition)}`);
    nodes += map.getItemAt(player.currentPosition);
    player.move();
}

console.log(`Nodes at end: ${nodes}`);

//getInput(); 
export {};