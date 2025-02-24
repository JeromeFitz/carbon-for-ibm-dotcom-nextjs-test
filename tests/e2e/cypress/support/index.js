/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import serializeDOM from "@percy/dom";
import "@percy/cypress";

import "./commands";

// Workaround, @percy/cypress was not properly loading in PercyDOM
if (window) {
  window.PercyDOM = {
    serialize: serializeDOM,
  };
}

beforeEach(() => {
  // Mock the country list
  cy.intercept(
    "https://1.www.s81c.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json",
    { fixture: "countrylist.json" }
  );

  // Mock the translation file
  cy.intercept(
    "https://1.www.s81c.com/common/carbon-for-ibm-dotcom/translations/masthead-footer/usen.json",
    { fixture: "translation.json" }
  );

  // Mock the user status
  cy.intercept("https://login.ibm.com/v1/mgmt/idaas/user/status/\n", {
    fixture: "status.json",
  });

  cy.intercept("https://prepiam.ice.ibmcloud.com/v1/mgmt/idaas/user/status/", {
    fixture: "status.json",
  });

  // Mock search typeahead API
  cy.intercept("**/search/typeahead/v1?*", {
    fixture: "typeahead.json",
  });

  // Block ibm-common.js
  cy.intercept("https://1.www.s81c.com/common/stats/ibm-common.js", {
    fixture: "ibm-common.js",
  });

  // Set an initial `digitalData` object
  cy.window().then((win) => {
    win.digitalData = {
      page: {
        category: {
          primaryCategory: "",
        },
        pageInfo: {
          effectiveDate: "",
          expiryDate: "",
          language: "en-US",
          publishDate: "",
          publisher: "",
          version: "Carbon for IBM.com",
          ibm: {
            contentDelivery: "",
            contentProducer: "",
            country: "US",
            industry: "",
            owner: "",
            siteID: "",
            subject: "",
            type: "",
          },
        },
        isDataLayerReady: true,
      },
    };
  });
});
