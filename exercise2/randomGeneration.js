import { readFileSync, writeFileSync } from "fs";

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

export { randomColorFileGeneration };