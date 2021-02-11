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
const nodemailer = require('nodemailer');
const AdmZip = require('adm-zip');
const fs = require('fs');
const light_house = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

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

	on('task', {
		lighthouseReport (report) {

		async function generateReport() {
			const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
			const options = {logLevel: 'info', output: 'html', port: chrome.port};
			const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
			const runnerResult = await light_house(report.url, options, config);

			// `.report` is the HTML report as a string
			const reportHtml = runnerResult.report;
			fs.writeFileSync(report.reportPath, reportHtml);

			// `.lhr` is the Lighthouse Result as a JS object
			console.log('Report is done for', runnerResult.lhr.finalUrl);
			console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

			await chrome.kill();

			return report.reportPath
		}

		return generateReport()
		}
	  })

	on('task', {
	zipFolder (fileData) {

		const file = new AdmZip();

		file.addLocalFolder(fileData.folderPath);
		file.writeZip(fileData.zipPath);

		return fileData.zipPath
	}
	  })

	on('task', {
		sendEmail (emailData) {

		async function sendEmailWithFile() {
			const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			user: emailData.senderEmail,
			pass: emailData.senderPassword
			}
		});

			const mailOptions = {
			from: emailData.senderEmail,
			to: emailData.receiverEmail,
			subject: emailData.subject,
			text: emailData.text,
			attachments: [
			{
				path: emailData.zipPath
			}
		]
		};

		await transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
			console.log(error);
			} else {
			console.log('Email sent: ' + info.response);
			}
		});
		return 'done'
		}

		return sendEmailWithFile();
		}
	})
};