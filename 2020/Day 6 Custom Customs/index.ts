const data: string = await Deno.readTextFile("input.txt");
const groups = data.split(/\n\n/);

const solveFirstPart = (groups: string[]) => {
    let splittedGroups = groups.map((e) => e.replace(/\n/gm, " "));
    splittedGroups = splittedGroups.map((e) => e.replace(/\s/gm, ""));
    const totalAnswers = [];

    for (let groupAnswers of splittedGroups) {
        totalAnswers.push([...new Set(groupAnswers)].length);
    }

    console.log(`Sum of answer count: ${totalAnswers.reduce((a, curr) => a + curr)}`);
};
const solveSecondPart = (groups: string[]) => {
    let validAnswers = 0;
    let splittedGroups = groups.map((e) => e.replace(/\n/gm, " "));

    for (let groupAnswers of splittedGroups) {
        let numOfMembers = groupAnswers.split(" ").length;
        let uniqueAnswers = [...new Set(groupAnswers.replace(/\s/gm, ""))];

        for (let char of uniqueAnswers) {
            let regExp = new RegExp(char, "g");
            let occurences = groupAnswers.match(regExp);
            if (occurences && occurences.length == numOfMembers) validAnswers++;
        }
    }

    console.log(`Valid answers: ${validAnswers}`);
};

solveFirstPart([...groups]);
solveSecondPart([...groups]);
export {};
