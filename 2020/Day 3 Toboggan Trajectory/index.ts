import {getInput} from '../readInput';

interface Position {
  line: number;
  column: number;
}

class Player {
  currentPosition: Position;
  addLine: number;
  addColumn: number;

  constructor(initialPosition: Position, columns: number, lines:   number) {
    this.currentPosition = initialPosition;
    this.addColumn = columns;
    this.addLine = lines;
  }

  move(): Position {
    this.currentPosition.line += this.addLine;
    this.currentPosition.column += this.addColumn;
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

    browseMap(player: Player): string {
        let nodes = "";
        while(player.currentPosition.line < this.map.length){
            nodes += this.getItemAt(player.currentPosition);
            player.move();
        }
        return nodes;
    }
}

const getInput = async (): Promise<string[]> => {
  const data = await Deno.readTextFile("input.txt");
  return data.split("\n");
};

const movement1:[number, number] = [1, 1];
const movement2:[number, number] = [3, 1];
const movement3:[number, number] = [5, 1];
const movement4:[number, number] = [7, 1];
const movement5:[number, number] = [1, 2];

const movements = [movement1, movement2, movement3, movement4, movement5];
const treesList: number[] = [];

for(let index = 0; index < movements.length; index++) {
    let initialPosition = {line: 0, column: 0};
    let player = new Player(initialPosition, movements[index][0], movements[index][1]);
    let map = new ExpandableMap(await getInput());
    let nodes = map.browseMap(player);
    let trees = nodes.match(/#/g);
    treesList.push(trees ? trees.length : 0);
}

console.log(treesList.reduce((acc, value) => acc * value));
export {};