// vim: set sts=4 shiftwidth=4 expandtab :

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

function transform_row_to_submission(headers, row) {
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

    let documentation = {};
    documentation.isDocumentationAvailable = row[headers[15]];
    let doc_urls = row[headers[16]].split('\n');
    documentation.documentationURL = doc_urls;
    submission.documentation = documentation;

    let NonPII = {};
    NonPII.collectsNonPII = row[headers[17]];
    NonPII.checkNonPIIAccessMechanism = row[headers[18]];
    NonPII.nonPIIAccessMechanism = ""; // TODO: find how to get this field.
    submission.NonPII = NonPII;

    let locations = {};
    let developmentCountries = row[headers[19]].split(', ');
    locations.developmentCountries = developmentCountries;
    let deploymentCountries = row[headers[20]].split(', ');
    locations.deploymentCountries = deploymentCountries;
    submission.locations = locations;

    return submission;
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
        let submission = transform_row_to_submission(headers, row);
        submissions.push(submission);
    }

    let ffpc = {};
    for (let i = 0; i < headers.length; ++i) {
        ffpc[i] = rows[3][headers[i]];
    }
    /*
    console.log(JSON.stringify({
        headers: headers,
        // submissions3: submissions[3]
    }, null, 4));
    */
}

module.exports = {
    transform_row_to_submission: transform_row_to_submission
};

// main();
