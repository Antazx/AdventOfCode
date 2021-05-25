const data: string = await Deno.readTextFile("input.txt");
const rulesList = data.split("\n");

class Bag {
    color: string;
    content: Bag[] = [];
    hasShiny: boolean = false;

    constructor(color: string) {
        this.color = color;
    }

    addContent(bag: Bag): void {
        this.content.push(bag);
    }

    setContent(content: string): void {
        const splittedContent = content.split(",");
        splittedContent.forEach((rule) => {
            const formattedRule = rule.replace(/^\s/, "");
            const splittedRule = formattedRule.split(" ");
            const numberOfBags = splittedRule.shift();
            const color = `${splittedRule.shift()} ${splittedRule.shift()}`;
            this.hasShiny = this.hasShiny || /shiny gold/.test(color);

            if (!numberOfBags) return;
            for (let index = 0; index < +numberOfBags; index++) {
                let newBag = new Bag(color);
                newBag.hasShiny = /shiny gold/.test(color);
                this.addContent(newBag);
            }
        });
    }
}

const bagList: Bag[] = [];
rulesList.forEach((bag) => {
    let splittedRule = bag.split(" ");
    let newBag = new Bag(`${splittedRule.shift()} ${splittedRule.shift()}`);
    splittedRule.shift();
    splittedRule.shift();
    let hasContent = !/contain no/.test(bag);
    if (hasContent) newBag.setContent(splittedRule.join(" "));
    bagList.push(newBag);
});

bagList.forEach((bag) => {
    const hasShinyChild = bag.content.some((b) => b.hasShiny);
    if (hasShinyChild) bag.hasShiny = true;
});

const bagHasShiny = (bag: Bag): boolean => {
    return bag.hasShiny;
};

const bagsWithShiny = bagList.filter(bagHasShiny);
console.log(bagsWithShiny.map((b) => b.color));
