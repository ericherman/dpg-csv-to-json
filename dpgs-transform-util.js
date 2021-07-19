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

function kebab_case(str) {
    let out = str.trim();
    // ignore everything after a colon
    if (str.indexOf(":") > 0) {
        out = out.substr(0, str.indexOf(":"))
    }
    // remove punctuation
    // excpet! the tests differ from the writen instructions:
    // see: https://github.com/unicef/publicgoods-candidates/blob/master/docs/development.md#ci---continous-integration
    // but also:
    // Filename is not valid: african-terrestrial-fibre-network-mapping-project-af-ter-fibre.json, it should be african-terrestrial-fibre-network-mapping-project-(afterfibre).json, where the filename must match the 'name' field in kebab case.
    out = out.replace(/[^a-zA-Z0-9()\s\-]/g, "");
    // convert space to dash
    out = out.replace(/\s+/g, '-');
    // // convert twoWords to two-words
    // out = out.replace(/([a-z])([A-Z])/g, "$1-$2");
    // lower-case it last
    out = out.toLowerCase();
    return out;
}

function submission_to_filename(submission) {
    let name = kebab_case(submission.name)
    return name + ".json";
}

async function submission_to_file(filename, submission) {
    let contents = JSON.stringify(submission, null, 2) + "\n";
    await fs.writeFileSync(filename, contents);
}

module.exports = {
    path_to_rows: path_to_rows,
    kebab_case: kebab_case,
    submission_to_filename: submission_to_filename,
    submission_to_file: submission_to_file,
};
