const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/data', (req, res) => {
    res.send(processFile(path.resolve(__dirname, 'metocean.txt')));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

/**
 * 
 * @param {string} inputFile The path to the file containing data to be processed.
 * @returns An array of objects representing each row of data.
 * @description Note that the way this function currently works is very specific to metocean.txt's structure.
 */
function processFile(inputFile) {
    const readText = require('fs').readFileSync(inputFile, "utf-8").trim();
    const [observationData, ...miscText] = readText.split('>');
    const helpText = miscText.join(" ").trim();

    const headers = observationData.slice(
        0,
        observationData.indexOf("\n")
    )
        .trim()
        .split(/\s+/);

    const rows = observationData.slice(
        observationData.indexOf("\n")
    )
        .trim()
        .split("\n");

    // time is a singular value that happens to contain a whitespace,
    // therefore join the first two values of a row together
    const rawValues = rows.map((row) => row.trim().split(/\s+/));
    const cleanedValues = rawValues.map(([s1, s2, ...rest]) => [`${s1} ${s2}`, ...rest]);

    return {
        // create observation objects containing "header: value"
        observations: cleanedValues.map((value) => {
            const result = headers.reduce((object, header, index) => {
                object[header] = value[index];
                return object;
            }, {});
            return result;
        }),
        helptext: helpText
    }
}