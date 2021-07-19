// vim: set sts=4 shiftwidth=4 expandtab :

// TODO: comma split robustness
// TODO: trim strings
// TODO: remove empty strings from lists

const fs = require('fs');
const csv = require('csvtojson');

function yes_no_unknown(str) {
    if (str.toLowerCase() == 'yes') {
        return 'Yes';
    }
    if (str.toLowerCase() == 'no') {
        return 'No';
    }
    return 'Unknown';
}

function yes_no_unknown_empty(str) {
    if (str == '') {
        return '';
    }
    return yes_no_unknown(str);
}

// Note! The order is important (sadly)
function transform_row_to_submission(headers, row) {
    let submission = {};

    submission.name = row[headers[0]];

    submission.clearOwnership = {};
    submission.clearOwnership.isOwnershipExplicit =
        yes_no_unknown(row[headers[10]]);
    submission.clearOwnership.copyrightURL = row[headers[11]];

    let pltIndep = {};
    pltIndep.mandatoryDepsCreateMoreRestrictions =
        yes_no_unknown(row[headers[12]]);
    pltIndep.isSoftwarePltIndependent = yes_no_unknown_empty(row[headers[13]]);
    pltIndep.pltIndependenceDesc = row[headers[14]];
    submission.platformIndependence = pltIndep;

    let documentation = {};
    documentation.isDocumentationAvailable = yes_no_unknown(row[headers[15]]);
    let doc_urls = row[headers[16]].split('\n');
    documentation.documentationURL = doc_urls;
    submission.documentation = documentation;

    let NonPII = {};
    NonPII.collectsNonPII = yes_no_unknown(row[headers[17]]);
    NonPII.checkNonPIIAccessMechanism = yes_no_unknown_empty(row[headers[18]]);
    NonPII.nonPIIAccessMechanism = ""; // TODO: find how to get this field.
    submission.NonPII = NonPII;

    let privacy = {};
    privacy.isPrivacyCompliant = yes_no_unknown(row[headers[21]]);
    privacy.privacyComplianceList = row[headers[22]].split('\n');
    // header[23] is a yes-no questions seemingly not reflected in the schema
    privacy.adherenceSteps = row[headers[24]].split('\n');
    submission.privacy = privacy;

    let standards = {};
    standards.supportStandards = yes_no_unknown(row[headers[25]]);
    standards.standardsList = row[headers[26]].split('\n');
    standards.evidenceStandardSupport = row[headers[27]].split('\n');
    standards.implementBestPractices = row[headers[28]];
    standards.bestPracticesList = row[headers[29]].split('\n');
    submission.standards = standards;

    let doNoHarm = {};

    let preventHarm = {};
    preventHarm.stepsToPreventHarm = yes_no_unknown(row[headers[47]]);
    preventHarm.additionalInfoMechanismProcessesPolicies = row[headers[48]];

    let dataPrivacySecurity = {};
    dataPrivacySecurity.collectsPII = yes_no_unknown(row[headers[30]]);
    dataPrivacySecurity.typesOfDataCollected = row[headers[31]].split(', ');
    dataPrivacySecurity.thirdPartyDataSharing =
        yes_no_unknown(row[headers[32]]);
    dataPrivacySecurity.dataSharingCircumstances = row[headers[33]].split('\n');
    // columns 34 and 35 do not appear to be present in the schema
    dataPrivacySecurity.ensurePrivacySecurity =
        yes_no_unknown(row[headers[36]]);
    dataPrivacySecurity.privacySecurityDescription = row[headers[37]];

    let inappropriateIllegalContent = {};
    inappropriateIllegalContent.collectStoreDistribute =
        yes_no_unknown(row[headers[38]]);
    inappropriateIllegalContent.type = row[headers[39]];
    inappropriateIllegalContent.illegalContentDetection =
        yes_no_unknown_empty(row[headers[40]]);
    inappropriateIllegalContent.illegalContentDetectionMechanism =
        row[headers[41]];

    let protectionFromHarassment = {};
    protectionFromHarassment.userInteraction = yes_no_unknown(row[headers[42]]);
    protectionFromHarassment.addressSafetySecurityUnderageUsers =
        yes_no_unknown_empty(row[headers[43]]);
    protectionFromHarassment.stepsAddressRiskPreventSafetyUnderageUsers =
        row[headers[44]].split('\n');
    protectionFromHarassment.griefAbuseHarassmentProtection =
        yes_no_unknown_empty(row[headers[45]]);
    protectionFromHarassment.harassmentProtectionSteps =
        row[headers[46]].split('\n');

    doNoHarm.preventHarm = preventHarm;
    doNoHarm.dataPrivacySecurity = dataPrivacySecurity;
    doNoHarm.inappropriateIllegalContent = inappropriateIllegalContent;
    doNoHarm.protectionFromHarassment = protectionFromHarassment;
    submission.doNoHarm = doNoHarm;

    let locations = {};
    let developmentCountries = row[headers[19]].split(', ');
    locations.developmentCountries = developmentCountries;
    let deploymentCountries = row[headers[20]].split(', ');
    locations.deploymentCountries = deploymentCountries;
    submission.locations = locations;

    return submission;
}

module.exports = {
    transform_row_to_submission: transform_row_to_submission
};
