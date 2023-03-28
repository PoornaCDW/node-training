const fileSystem = require("fs");

const colorPalette = JSON.parse(fileSystem.readFileSync("./color_ palette.json", "UTF-8", (error) => {
    if(error)
        console.log("Error");
    else
        console.log("File read succesfully!");
}));

let uniqueRandomNumbers = [];
while(uniqueRandomNumbers.length < 5) {
    let randNum = Math.floor(Math.random() * 44);
    if(uniqueRandomNumbers.indexOf(randNum) === -1)
        uniqueRandomNumbers.push(randNum);
}

let randomColors = [];
for(let randomColor of uniqueRandomNumbers) {
    randomColors.push(colorPalette[randomColor]);
}

fileSystem.writeFileSync("random_generated_color_palette.json", JSON.stringify(randomColors), "UTF-8", (error) => {
    if(error)
        console.log("Error");
    else
        console.log("File written succesfully!");
});

const randomGeneratedColorPalette = JSON.parse(fileSystem.readFileSync("random_generated_color_palette.json", "utf-8", (error) => {
    if(error)
        console.log("Error");
    else
        console.log("File read succesfully!");
}));

console.log(randomGeneratedColorPalette);