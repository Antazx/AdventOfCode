const getInput = async (): Promise<number[]> => {
  const data = await Deno.readTextFile("values.txt");
  const dataArray = data.split('\n');
  return dataArray.map((e:string) => +e);
}

const input = await getInput();
let complement: Record<number, boolean> = {};
for (let num of input) {
  complement[num] = true;
  let valueToFind = 2020 - num;
  if (complement[valueToFind]) console.log(num * valueToFind);
}

for (let xValue of input) {
    for( let yValue of input) {
        for(let wValue of input) {
            if(xValue + yValue + wValue === 2020) console.log(xValue * yValue * wValue);
        }
    }
}

export {};