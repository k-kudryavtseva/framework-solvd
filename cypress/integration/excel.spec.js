const testData = require('../fixtures/testData.json')

testData.forEach((testDataRow, index, testDataArray) => {
    describe('Test urls from excel', () => {
        beforeEach('testing url', () => {

            // By default, if you don’t provide any arguments to the lighthouse command,
            // the test will fail if any of the categories have a reported score of less than 100.
            const customThresholds = {
                performance: 0,
                accessibility: 0,
                seo: 0,
            };

            // By default, if you don’t provide any arguments to the lighthouse command,
            // your page will be simulated on mobile view.
            const desktopConfig = {
                formFactor: 'desktop',
                screenEmulation: {disabled: true},
            };

            cy.visit(testDataRow.url)
            cy.lighthouse(customThresholds, desktopConfig)
        })
        it('',() => {
					const report = {
						url: testDataRow.url,
						reportPath: testDataRow.reportPath,
					}

					cy.task('lighthouseReport', report, {timeout: 120000})
    	})

			after('zip reports and send to email', () => {



				if (testDataArray.length - 1 === index) {

					cy.fixture('email').then(email => {
						const fileData = {
							folderPath: email.folderPath,
							zipPath: email.zipPath
						}

						cy.task('zipFolder', fileData).then((zipPath) => {

							const emailData = {
								zipPath: zipPath,
								senderEmail: email.senderEmail,
								senderPassword: email.senderPassword,
								receiverEmail: email.receiverEmail,
								subject: email.subject,
								text: email.text
							}

							cy.task('sendEmail', emailData).then((status) => {
								console.log("Status: ", status)
							})
						})

					})
				}
			})
	})
})
