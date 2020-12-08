interface PasswordPolicy {
    letter: string;
    max: number;
    min: number;
    password: string;
}

const getInput = async (): Promise<PasswordPolicy[]> => {
    const data = await Deno.readTextFile("passwords.txt");
    const dataArray = data.split('\n');
    const passwords: PasswordPolicy[] = [];
    for(let value of dataArray) {
        let valueArray = value.split(' ');

        let range = valueArray[0].split('-');
        let letter = valueArray[1].replace(':', '');
        let password = valueArray[2];
        
        passwords.push({
            letter:letter,
            min: +range[0],
            max: +range[1],
            password: password
        })
    }
    return passwords;
}

const checkPasswordProblemOne = (pass: PasswordPolicy): boolean => {
    let criteria: RegExp = new RegExp(pass.letter, 'g');
    let matches = pass.password.match(criteria);
    if(matches && pass.min <= matches.length && matches.length <= pass.max) return true; 
    return false;
}

const checkPasswordProblemTwo = (pass: PasswordPolicy): boolean => {
    let minMatches = (pass.password.charAt(pass.min - 1) == pass.letter);
    let maxMatches = (pass.password.charAt(pass.max - 1) == pass.letter);

    if(!minMatches && maxMatches) return true;
    if(minMatches && !maxMatches) return true;

    return false;
}

const passwords: PasswordPolicy[] = await getInput();
let okPasswordsProblemOne = 0;
let okPasswordsProblemTwo = 0;

passwords.forEach((pass) => {
    if(checkPasswordProblemOne(pass)) okPasswordsProblemOne++;
    if(checkPasswordProblemTwo(pass)) okPasswordsProblemTwo++;
});

console.log(`okPasswordsProblemOne = ${okPasswordsProblemOne}`);
console.log(`okPasswordsProblemTwo = ${okPasswordsProblemTwo}`);

