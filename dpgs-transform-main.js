// vim: set sts=4 shiftwidth=4 expandtab :

const txfrm = require('./dpgs-transform');

const fs = require('fs');
const csv = require('csvtojson');

async function path_to_rows(path) {
    let headers = [];
    let converter = csv({
        flatKeys: true
    }).on('header', (doc_headers) => {
        for (let i = 0; i < doc_headers.length; ++i) {
            headers.push(doc_headers[i]);
        }
    }).fromFile(path);

    let rows = [];
    await converter.then((objs) => {
        for (let i = 0; i < objs.length; ++i) {
            rows.push(objs[i]);
        }
    });
    return {
        headers: headers,
        rows: rows
    };
}

async function main() {
    const csvFilePath = 'Digital-Public-Goods-Submissions-Sheet1.csv';
    let result = await path_to_rows(csvFilePath);
    let rows = result.rows;
    let headers = result.headers;

    let submissions = [];
    for (let i = 0; i < rows.length; ++i) {
        let row = rows[i];
        if (0 && (i == 3)) {
            console.log(JSON.stringify({
                row: row
            }, null, 4));
        }
        let submission = txfrm.transform_row_to_submission(headers, row);
        submissions.push(submission);
    }

    console.log(JSON.stringify({
        headers: headers,
        submissions: submissions,
    }, null, 4));
}

main();