/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
  }
  const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
  module.exports = (on, config) => {
	on("before:browser:launch", (browser = {}, launchOptions) => {
	  prepareAudit(launchOptions);
	});
	on("task", {
	  lighthouse: lighthouse((lighthouseReport) => {
		console.log(lighthouseReport); // raw lighthouse reports
	  }),
	  pa11y: pa11y((pa11yReport) => {
		console.log(pa11yReport); // raw pa11y reports
	  }),
	});
	on("task", {
	  transform({filename,sheet,cell}){
		const xlsx = require("xlsx");
		var wb = xlsx.readFile("cypress/fixtures/"+filename);
		var ws = wb.Sheets[sheet];
		if (cell == 'A1') cell = 'A2'
		var url = ws[cell];
		return url.l.Target;
	  }
	});
  };