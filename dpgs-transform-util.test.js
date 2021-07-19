// vim: set sts=4 shiftwidth=4 expandtab :
"use strict";

const util = require('./dpgs-transform-util.js');
const fs = require('fs');

test('test kebab', async () => {

    expect(util.kebab_case("no spaces")).toBe("no-spaces");
    expect(util.kebab_case("Ignore Colon: the Foo")).toBe("ignore-colon");
    expect(util.kebab_case(" no leading or trailing spaces "))
        .toBe("no-leading-or-trailing-spaces");
    expect(util.kebab_case("Standard for Public Code"))
        .toBe("standard-for-public-code");
//    expect(util.kebab_case("VivoosVR")).toBe("vivoos-vr");
//    expect(util.kebab_case("Immunization Calculation Engine (ICE)"))
//        .toBe("immunization-calculation-engine-ice");
});

test('submission to filename', async () => {
    let submission = {
        "name": "Standard for Public Code"
    };
    expect(util.submission_to_filename(submission))
        .toBe("standard-for-public-code.json");
});

test('json to file', async () => {
    let submission = {
        "name": "Temp Test File",
        "foo": "bar",
    };
    let filename = "temp-test-file.json";

    // make sure the file does not exist before we write to it
    try {
        fs.unlinkSync(filename);
    } catch (expected_error) {}

    await util.submission_to_file(filename, submission);

    let retrieved = await fs.readFileSync(filename, 'utf8');
    let actual = JSON.parse(retrieved);

    expect(actual).toStrictEqual(submission);

    // clean up file from filesystem
    fs.unlinkSync(filename);
});
