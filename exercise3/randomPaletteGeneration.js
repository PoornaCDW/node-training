/* Importing the `readFileSync` and `writeFileSync` functions from the `fs` module and the `randomExt`
module. */
const { readFileSync, writeFileSync } = require("fs");
const randomExt = require("random-ext");

/**
 * It generates a random color palette of 5 colors from a JSON file containing a list of colors
 * @returns An array of 5 random colors.
 */
const randomGeneratedColorPalette = () => {
    const colorPalette = JSON.parse(readFileSync("color_ palette.json", "UTF-8"));
    
    let uniqueRandomNumbers = [];
    while(uniqueRandomNumbers.length < 5) {
        let randNum = randomExt.integer(colorPalette.length, 0);
        if(uniqueRandomNumbers.indexOf(randNum) === -1)
            uniqueRandomNumbers.push(randNum);
    }

    let randomColors = [];
    for(const randomColor of uniqueRandomNumbers) {
        randomColors.push(colorPalette[randomColor]);
    }

    writeFileSync("random_generated_color_palette.json", JSON.stringify(randomColors), "UTF-8");
    
    const randomGeneratedColorPalette = JSON.parse(readFileSync("random_generated_color_palette.json", "utf-8"));

    return randomGeneratedColorPalette;
}

/* Exporting the `randomGeneratedColorPalette` function so that it can be used in other files. */
module.exports = { randomGeneratedColorPalette };