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
    // remove punctuation
    out = out.replace(/[^a-zA-Z0-9\s\-]/g, "");
    // convert space to dash
    out = out.replace(/\s+/g, '-');
    // convert twoWords to two-words
    out = out.replace(/([a-z])([A-Z])/g, "$1-$2");
    // lower-case it last
    out = out.toLowerCase();
    return out;
}

function submission_to_filename(submission) {
    let name = kebab_case(submission.name)
    return name + ".json";
}

async function submission_to_file(filename, submission) {
    let contents = JSON.stringify(submission, null, 4) + "\n";
    await fs.writeFileSync(filename, contents);
}

module.exports = {
    path_to_rows: path_to_rows,
    kebab_case: kebab_case,
    submission_to_filename: submission_to_filename,
    submission_to_file: submission_to_file,
};
