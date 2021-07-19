// vim: set sts=4 shiftwidth=4 expandtab :
"use strict";

const util = require('./dpgs-transform-util.js');

test('test kebab', async () => {

    // expect(s.name).toBe("Standard for Public Code");
    // expect(s.documentation.documentationURL).toStrictEqual(urls);

    expect(util.kebab_case("no spaces")).toBe("no-spaces");
    expect(util.kebab_case(" no leading or trailing spaces "))
        .toBe("no-leading-or-trailing-spaces");
    expect(util.kebab_case("Standard for Public Code"))
        .toBe("standard-for-public-code");
    expect(util.kebab_case("VivoosVR")).toBe("vivoos-vr");
    expect(util.kebab_case("Immunization Calculation Engine (ICE)"))
        .toBe("immunization-calculation-engine-ice");
});
