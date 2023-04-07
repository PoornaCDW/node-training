/* Importing the `readFileSync` and `writeFileSync` functions from the `fs` module and the `randomExt`
module. */
const { readFileHelper } = require("./readFileHelper");
const { writeFileHelper } = require("./writeFileHelper");
const randomExt = require("random-ext");

/**
 * It generates a random color palette of 5 colors from a JSON file containing a list of colors
 * @returns An array of 5 random colors.
 */
const randomGeneratedColorPalette = () => {
    const colorPalette =  readFileHelper("color_ palette.json");

    const randomColors = new Set();
    while(randomColors.size < 5) {
        randomColors.add(colorPalette[randomExt.integer(colorPalette.length-1, 0)]);
    }

    console.log(writeFileHelper("random_generated_color_palette.json", Array.from(randomColors)));
    
    const randomGeneratedColorPalette = readFileHelper("random_generated_color_palette.json");

    return randomGeneratedColorPalette;
}

/* Exporting the `randomGeneratedColorPalette` function so that it can be used in other files. */
module.exports = { randomGeneratedColorPalette };