// Seat = FBFBBFFRLR;
// Seat = FBFBBFF row[0-127] RLR;
// Seat = F [0-64] B [32-64] F [32-48] B [40-48] B [46-48] F []F  RLR;

const getInput = async (): Promise<string> => {
    const data: string = await Deno.readTextFile("input.txt");
    return data;
};

const getRow = (code: string): number => {
    let rowRange: [number, number] = [0, 128];
    for (let letter of code) {
        let amount = (rowRange[1] - rowRange[0]) / 2;
        if (letter == "F") rowRange[1] = rowRange[1] - amount;
        if (letter == "B") rowRange[0] = rowRange[0] + amount;
    }
    return rowRange[0];
};

const getColumn = (code: string): number => {
    let colRange: [number, number] = [0, 8];
    for (let letter of code) {
        let amount = (colRange[1] - colRange[0]) / 2;
        if (letter == "L") colRange[1] = colRange[1] - amount;
        if (letter == "R") colRange[0] = colRange[0] + amount;
    }
    return colRange[0];
};

const data = await getInput();
const seats = data.split("\n");

const seatsIds = [];
for (let code of seats) {
    let row = getRow(code.substring(0, 7));
    let column = getColumn(code.substring(7, 10));
    seatsIds.push(row * 8 + column);
}

seatsIds.sort((a, b) => a - b);
const indexFail = seatsIds.find(
    (value, index, array) => value != index + array[0]
);
console.log(`Highest seatID: ${seatsIds[seatsIds.length - 1]}`);
if (indexFail) console.log(`My seatID is: ${indexFail - 1}`);
export {};
