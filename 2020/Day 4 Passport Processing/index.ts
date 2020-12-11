const getInput = async (): Promise<string> => {
    const data: string = await Deno.readTextFile("input.txt");
    return data;
};

const checkPropinLine = (l: string, prop: string): boolean => {
    switch (prop) {
        case "byr":
            l = l.replace("byr:", "");
            return 1920 <= +l && +l <= 2002 && l.length == 4;

        case "iyr":
            l = l.replace("iyr:", "");
            return 2010 <= +l && +l <= 2020 && l.length == 4;
        case "eyr":
            l = l.replace("eyr:", "");
            return 2020 <= +l && +l <= 2030 && l.length == 4;
        case "hgt":
            l = l.replace("hgt:", "");
            const isCm = l.indexOf("cm") != -1;
            const isInch = l.indexOf("in") != -1;
            if (!isCm && !isInch) return false;
            if (isCm && !isInch) {
                l = l.replace("cm", "");
                return 150 <= +l && +l <= 193;
            }
            if (!isCm && isInch) {
                l = l.replace("in", "");
                return 59 <= +l && +l <= 76;
            }
            return false;
        case "hcl":
            l = l.replace("hcl:", "");
            const hclRegExp = /^#[a-fA-F0-9]{6}$/;
            return hclRegExp.test(l);
        case "ecl":
            l = l.replace("ecl:", "");
            const allowedColors = [
                "amb",
                "blu",
                "brn",
                "gry",
                "grn",
                "hzl",
                "oth",
            ];
            for (let color of allowedColors) {
                if (l == color) return true;
            }
            return false;
        case "pid":
            l = l.replace("pid:", "");
            const pidRegExp = /^\d{9}$/;
            return pidRegExp.test(l);
        default:
            return false;
    }
};

const isValidPassport = (line: string): boolean => {
    const propsToSearch = [
        "byr",
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid",
        "cid",
    ];

    const lineArray = line.split(" ");
    let validProps = 1;
    for (let l of lineArray) {
        const prop = l.substring(0, 3);
        if (checkPropinLine(l, prop)) {
            validProps++;
            console.log(`${prop}  is valid`);
        }
    }
    console.log(`Line: ${line} has ${validProps} valid props`);
    if (validProps == 8) return true;
    return false;
};

const data = await getInput();
const dataArray = data.split(/\n\n/);
const passportList = dataArray.map(
    (value) => (value = value.replace(/\n/gm, " "))
);
let validPassports = 0;
for (let line of passportList) {
    if (isValidPassport(line)) validPassports++;
}
console.log(validPassports);
export {};