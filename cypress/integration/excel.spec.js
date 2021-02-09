const testData = require('../fixtures/testData.json')

testData.forEach((testDataRow, index, testDataArray) => {
    describe('Test urls from excel', () => {
        beforeEach('testing url', () => {
            cy.visit(testDataRow.url)
            cy.lighthouse({
                performance: 60
            })
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
