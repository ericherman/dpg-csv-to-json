// vim: set sts=4 shiftwidth=4 expandtab :

const fs = require('fs');
const csv = require('csvtojson');

let headers = [];

async function path_to_rows(path) {
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
    return rows;
}

function transform_row_to_submission(row) {
    let submission = {};

    submission.name = row[headers[0]];

    submission.clearOwnership = {};
    submission.clearOwnership.isOwnershipExplicit = row[headers[10]];
    submission.clearOwnership.copyrightURL = row[headers[11]];

    let pltIndep = {};
    pltIndep.mandatoryDepsCreateMoreRestrictions = row[headers[12]];
    pltIndep.isSoftwarePltIndependent = row[headers[13]];
    pltIndep.pltIndependenceDesc = row[headers[14]];
    submission.platformIndependence = pltIndep;

    return submission;
}

async function main() {
    const csvFilePath = 'Digital-Public-Goods-Submissions-Sheet1.csv';
    let rows = await path_to_rows(csvFilePath);

    let submissions = [];
    for (let i = 0; i < rows.length; ++i) {
        let row = rows[i];
        if (0 && (i == 3)) {
            console.log(JSON.stringify({
                row: row
            }, null, 4));
        }
        let submission = transform_row_to_submission(row);
        submissions.push(submission);
    }

    console.log(JSON.stringify({
        submissions: submissions,
        submissions3: submissions[3]
    }, null, 4));
}

main();