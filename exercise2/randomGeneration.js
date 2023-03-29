/* Importing the readFileSync and writeFileSync functions from the fs module. */
const { readFileSync, writeFileSync } = require("fs");
// import { readFileSync, writeFileSync } from "fs";

/**
 * It reads the color palette file, generates 5 random numbers, and writes the corresponding colors to
 * a new file
 * @returns An array of 5 random colors from the color_palette.json file.
 */
const randomColorFileGeneration = () => {
    const colorPalette = JSON.parse(readFileSync("color_ palette.json", "UTF-8"));
    
    let randomColors = [];
    while(randomColors.length < 5) {
        let randNum = Math.floor(Math.random() * 44);
        if(randomColors.indexOf(randNum) === -1)
            randomColors.push(colorPalette[randNum]);
    }
    
    writeFileSync("random_generated_color_palette.json", JSON.stringify(randomColors), "UTF-8");
    
    const randomGeneratedColorPalette = JSON.parse(readFileSync("random_generated_color_palette.json", "utf-8"));

    return randomGeneratedColorPalette;
}

/* Exporting the `randomColorFileGeneration` function so that it can be used in other files. */
module.exports = { randomColorFileGeneration };