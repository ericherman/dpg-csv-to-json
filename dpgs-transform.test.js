// vim: set sts=4 shiftwidth=4 expandtab :
"use strict";

const txfrm = require('./dpgs-transform');

test('test row transform', async () => {
    let headers = [];
    for (let i = 0; i < 57; ++i) {
        headers.push(`${i}`);
    }

    let test_row = {
        "0": "Standard for Public Code",
        "1": "The Standard for Public Code provides guidance to public organizations building open source software on how to enable successful future reuse by other public organizations.",
        "2": "Foundation for Public Code",
        "3": "https://standard.publiccode.net/",
        "4": "Open Standard",
        "5": "https://github.com/publiccodenet/standard",
        "6": "9: Industry, Innovation and Infrastructure, 11: Sustainable Cities and Communities, 16: Peace, Justice and Strong Institutions, 17: Partnerships for the Goals",
        "7": "The mission of the Foundation for Public Code is to enable public purpose software that is open and collaborative. We do this by helping public organizations develop and maintain open source software together. \n\nThe Standard for Public Code is a key instrument of our work: it provides criteria and requirements for public-sector open source projects that, if met, make the projects reusable, scalable and sustainable. Our work contributes to the Sustainable Development Goals in several ways:\n\nhttps://blog.publiccode.net/policy/2020/10/02/we-support-the-sustainable-development-goals.html\n\nhttps://about.publiccode.net/activities/value-and-impact/sustainable-development-goals.html",
        "8": "CC0-1.0: Creative Commons Zero v1.0 Universal",
        "9": "https://github.com/publiccodenet/standard/blob/master/LICENSE.md",
        "10": "Yes",
        "11": "https://standard.publiccode.net/GOVERNANCE.html",
        "12": "No",
        "13": "",
        "14": "",
        "15": "Yes",
        "16": "https://github.com/publiccodenet/standard",
        "17": "No",
        "18": "",
        "19": "The Netherlands",
        "20": "The Standard for Public Code is already in use in the Netherlands. We know of people and organizations in France, Germany and Denmark who would like to use it (based on efforts to get a translation). It is developed as a global asset and can be deployed by anyone, anywhere.",
        "21": "Yes",
        "22": "This project doesn't require, collect or store any personal information. It is fully EU General Data Protection Regulation compliant.\n\nThe project encourages users to avoid sharing sensitive data on their own platforms (see 'How to test' in [Code in the open](https://standard.publiccode.net/criteria/code-in-the-open.html)).",
        "23": "Yes",
        "24": "The Standard for Public Code is best practice guidance for developing open source software projects. Though public bodies implementing the Standard are subject to laws, the Standard itself is not. The Standard does not encourage illegal behavior.",
        "25": "Yes",
        "26": "The Standard requires or strongly encourages users to meet or use:\n\n- [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21/) \n- [publiccode.yml](https://github.com/italia/publiccode.yml)\n- one of these:\n\t- [Business Process Model and Notation](http://www.bpmn.org/) (BPMN)\n\t- [Decision Model Notation](https://www.omg.org/dmn/) (DMN)\n\t- [Case Management Model Notation](https://www.omg.org/cmmn/) (CMMN)\n- Open standards as defined by the [Open Source Initiative Open Standard Requirements](https://opensource.org/osr)\n- an [Open Source Institute approved open source license](https://opensource.org/licenses/category).\n\nFor clarity and ease of use, the Standard uses, meets or follows:\n\n- [RFC 2119](https://tools.ietf.org/html/rfc2119)",
        "27": "- WCAAG 2: see 'Requirements' in [Use plain English](https://standard.publiccode.net/criteria/understandable-english-first.html#requirements)\n- publiccode.yml: see 'Requirements' in [Create reusable and portable code](https://standard.publiccode.net/criteria/reusable-and-portable-codebases.html#requirements)\n- BPMN, DMN or CMMN: see 'Policy makers: what you need to do' in [Bundle policy and code](https://standard.publiccode.net/criteria/bundle-policy-and-code.html#policy-makers:-what-you-need-to-do)\n- Open standards: see 'Requirements' in [Use open standards](https://standard.publiccode.net/criteria/open-standards.html#requirements)\n- Open source licence: see 'Requirements' in [Publish with an open license](https://standard.publiccode.net/criteria/open-licenses.html)\n- RFC 2119: see the [reader's guide](https://standard.publiccode.net/readers-guide.html)\n\nWe strive to ensure that the Standard itself meets the requirements set out in the Standard.",
        "28": "No",
        "29": "",
        "30": "No",
        "31": "",
        "32": "",
        "33": "",
        "34": "",
        "35": "",
        "36": "",
        "37": "",
        "38": "No",
        "39": "",
        "40": "Yes",
        "41": "All contributors to the Standard for Public Code must follow the [Code of Conduct](https://standard.publiccode.net/CODE_OF_CONDUCT.html). This sets out our values and explains how we handle Code of Conduct violations.\n\n[Contributing](https://standard.publiccode.net/CONTRIBUTING.html) explains our review process. Though no times are listed, in practice contributions are usually checked within 2 hours during business hours, Monday-Friday. We have set up automatic alerts to notify us when a new contribution is made.",
        "42": "Yes",
        "43": "No",
        "44": "The project does not identify, collect or store the age of the audience, nor enforce age limits. The target audience to use the Standard are civil servants (policy makers, managers), and developers and designers. Anyone is allowed to contribute to the Standard via the GitHub repository. Contributions must abide by our code of conduct.",
        "45": "Yes",
        "46": "Our code of conduct is enforced as follows:\nInstances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at directors@publiccode.net. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.\n\nProject maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project’s leadership.",
        "47": "Yes",
        "48": "The target audience is public organizations that have ethics and value based policies already. We remind them to document that publicly in our criterion \"Document your objectives\":  https://standard.publiccode.net/criteria/document-objectives.html",
        "49": "We don't collect any information from users.",
        "50": "",
        "51": "I agree",
        "52": "Yes",
        "53": "",
        "54": "No",
        "55": "",
        "56": ""
    };
    let s = await txfrm.transform_row_to_submission(headers, test_row);

    expect(s.name).toBe("Standard for Public Code");

    expect(s.clearOwnership.isOwnershipExplicit).toBe("Yes");
    expect(s.clearOwnership.copyrightURL)
        .toBe("https://standard.publiccode.net/GOVERNANCE.html");

    expect(s.platformIndependence.mandatoryDepsCreateMoreRestrictions)
        .toBe("No");
    expect(s.platformIndependence.isSoftwarePltIndependent).toBe("");
    expect(s.platformIndependence.pltIndependenceDesc).toBe("");

    expect(s.documentation.isDocumentationAvailable).toBe("Yes");
    let urls = [ "https://github.com/publiccodenet/standard" ];
    expect(s.documentation.documentationURL).toStrictEqual(urls);

    expect(s.NonPII.collectsNonPII).toBe("No");
    expect(s.NonPII.checkNonPIIAccessMechanism).toBe("");
    expect(s.NonPII.nonPIIAccessMechanism).toBe("");
});
