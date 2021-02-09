const testData = require('../../fixtures/testData.json')

testData.forEach(testDataRow => {
    describe('Test urls from excel', () => {
        beforeEach('testing url', () => {
            cy.visit(testDataRow.url)
            cy.lighthouse({
                performance: 80
            })
        })
        it('',() => {
        })
    })
})

