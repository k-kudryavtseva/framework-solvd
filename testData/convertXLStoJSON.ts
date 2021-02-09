import { writeFileSync } from 'fs'
import * as XLSX from 'xlsx'

try {
	const workBook = XLSX.readFile('./testData/urls.xlsx')
	const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets.Sheet1)
	writeFileSync(
		'./cypress/fixtures/testData.json',
		JSON.stringify(jsonData, null, 4).replace(/ /g, ''),
		'utf-8'
	)
} catch (e) {
	throw Error(e)
}
