// vim: set sts=4 shiftwidth=4 expandtab :

// TODO: comma split robustness
// TODO: trim strings
// TODO: remove empty strings from lists

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

    let privacy = {};
    privacy.isPrivacyCompliant = row[headers[21]];
    privacy.privacyComplianceList = row[headers[22]].split('\n');
    // header[23] is a yes-no questions seemingly not reflected in the schema
    privacy.adherenceSteps = row[headers[24]].split('\n');
    submission.privacy = privacy;

    let standards = {};
    standards.supportStandards = row[headers[25]];
    standards.standardsList = row[headers[26]].split('\n');
    standards.evidenceStandardSupport = row[headers[27]].split('\n');
    standards.implementBestPractices = row[headers[28]];
    standards.bestPracticesList = row[headers[29]].split('\n');
    submission.standards = standards;

    let doNoHarm = {};

    let dataPrivacySecurity = {};
    dataPrivacySecurity.collectsPII = row[headers[30]];
    dataPrivacySecurity.typesOfDataCollected = row[headers[31]].split(', ');
    dataPrivacySecurity.thirdPartyDataSharing = row[headers[32]];
    dataPrivacySecurity.dataSharingCircumstances = row[headers[33]].split('\n');
    // columns 34 and 35 do not appear to be present in the schema
    dataPrivacySecurity.ensurePrivacySecurity = row[headers[36]];
    dataPrivacySecurity.privacySecurityDescription = row[headers[37]];

    let inappropriateIllegalContent = {};
    inappropriateIllegalContent.collectStoreDistribute = row[headers[38]];
    inappropriateIllegalContent.type = row[headers[39]];
    inappropriateIllegalContent.illegalContentDetection = row[headers[40]];
    inappropriateIllegalContent.illegalContentDetectionMechanism =
        row[headers[41]];

    let protectionFromHarassment = {};
    protectionFromHarassment.userInteraction = row[headers[42]];
    protectionFromHarassment.addressSafetySecurityUnderageUsers =
        row[headers[43]];
    protectionFromHarassment.stepsAddressRiskPreventSafetyUnderageUsers =
        row[headers[44]].split('\n');
    protectionFromHarassment.griefAbuseHarassmentProtection = row[headers[45]];
    protectionFromHarassment.harassmentProtectionSteps =
        row[headers[46]].split('\n');

    let preventHarm = {};
    preventHarm.stepsToPreventHarm = row[headers[47]];
    preventHarm.additionalInfoMechanismProcessesPolicies = row[headers[48]];

    doNoHarm.dataPrivacySecurity = dataPrivacySecurity;
    doNoHarm.inappropriateIllegalContent = inappropriateIllegalContent;
    doNoHarm.protectionFromHarassment = protectionFromHarassment;
    doNoHarm.preventHarm = preventHarm;
    submission.doNoHarm = doNoHarm;

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
