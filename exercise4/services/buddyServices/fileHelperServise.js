const { readFile, writeFile } = require('fs');

const readFileHelper = (path) => {
    readFile(path, (err, data) => {
        if (err) {
            return err;
        }
        return data;
    });
}

const writeFileHelper = (path, fileData) => {
    writeFile(path, JSON.stringify(fileData), (err) => {
        if (err) {
            return err;
        }
        return "The record has been updated successfully!";
    });
}

module.exports = {
    readFileHelper,
    writeFileHelper
};