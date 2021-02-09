const testData = require('../fixtures/testData.json')

testData.forEach(testDataRow => {
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

			cy.task('lighthouseReport', report, {timeout: 120000}).then((reportPath) => {

				const fileData = {
					folderPath: testDataRow.folderPath,
					zipPath: testDataRow.zipPath
				}

				cy.task('zipFolder', fileData).then((zipPath) => {

					const emailData = {
						zipPath: zipPath,
						senderEmail: testDataRow.senderEmail,
						senderPassword: testDataRow.senderPassword,
						receiverEmail: testDataRow.receiverEmail,
						subject: testDataRow.subject,
						text: testDataRow.text
					}

					cy.task('sendEmail', emailData).then((status) => {
						console.log("Status: ", status)
					})

				})

			})
    	})
})
})
