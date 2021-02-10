const urls = require('../fixtures/urls.json')

urls.forEach((urlRow, index, urlsArray) => {
    describe('Test urls from excel', () => {
        beforeEach('testing url', () => {
            cy.visit(urlRow.url, {failOnStatusCode: false})
            cy.lighthouse({
                performance: 60
            })
        })
        it('',() => {
					const report = {
						url: urlRow.url,
						reportName: urlRow.reportName,
					}

					cy.task('lighthouseReport', report, {timeout: 120000}).then(reportPath => {

						console.log('Lighthouse report saved to: ' + reportPath)

					})
    	})

			after('zip reports and send to email', () => {

				if (urlsArray.length - 1 === index) {

					cy.fixture('emailData').then(emailData => {

						cy.task('zipFolder', emailData[0].zipName).then((zipPath) => {

							const localEmailData = {
								zipPath: zipPath,
								senderEmail: emailData[0].senderEmail,
								senderPassword: emailData[0].senderPassword,
								receiverEmail: emailData[0].receiverEmail,
								subject: emailData[0].subject,
								text: emailData[0].text
							}

							cy.task('sendEmail', localEmailData).then((status) => {
								console.log("Status: ", status)
							})
						})

					})
				}
			})
	})
})
