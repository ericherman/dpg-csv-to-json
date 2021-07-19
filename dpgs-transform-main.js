// vim: set sts=4 shiftwidth=4 expandtab :

const txfrm = require('./dpgs-transform');

const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const util = require('./dpgs-transform-util.js')

async function main() {
    let subdir = "out";
    let dir = path.join(__dirname, subdir);
    await fs.mkdir(dir, (err) => {
        if (err) {
            throw error;
        }
    });

    const csvFilePath = 'Digital-Public-Goods-Submissions-Sheet1.csv';
    let result = await util.path_to_rows(csvFilePath);
    let rows = result.rows;
    let headers = result.headers;

    let submissions = [];
    for (let i = 0; i < rows.length; ++i) {
        let row = rows[i];
        let submission = txfrm.transform_row_to_submission(headers, row);
        let filename = util.submission_to_filename(submission);
        let fullpath = path.join(dir, filename);
        console.log(fullpath);
        await util.submission_to_file(fullpath, submission)
    }
}

main();
