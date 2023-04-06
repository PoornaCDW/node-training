const { readFileSync, readFile, writeFileSync } = require("fs");

readFile("./color_ palette.json", "UTF-8", (err, data) => {

    const colorPalette = JSON.parse(data);
    
    if (err) {
        console.log(err);
    } else {
        if (Object.keys(colorPalette).length === 0) {
            console.log('JSON file is empty');
        } else {
            let randomColors = [];
            while(randomColors.length < 5) {
                let randNum = Math.floor(Math.random() * 44);
                if(randomColors.indexOf(randNum) === -1)
                    randomColors.push(colorPalette[randNum]);
            }
            
            writeFileSync("random_generated_color_palette.json", JSON.stringify(randomColors), "UTF-8");
            
            const randomGeneratedColorPalette = JSON.parse(readFileSync("random_generated_color_palette.json", "utf-8"));
            
            console.log(randomGeneratedColorPalette);
        }
    }

});