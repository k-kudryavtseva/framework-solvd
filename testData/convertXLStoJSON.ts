import { writeFileSync } from 'fs'
import * as XLSX from 'xlsx'

try {
	const workBookUrls = XLSX.readFile('./testData/urls.xlsx')
	const jsonDataUrls = XLSX.utils.sheet_to_json(workBookUrls.Sheets.Sheet1)
	writeFileSync(
		'./cypress/fixtures/urls.json',
		JSON.stringify(jsonDataUrls, null, 4).replace(/ /g, ''),
		'utf-8'
	)

	const workBookEmailData = XLSX.readFile('./testData/emailData.xlsx')
	const jsonEmailData = XLSX.utils.sheet_to_json(workBookEmailData.Sheets.Sheet1)
	writeFileSync(
		'./cypress/fixtures/emailData.json',
		JSON.stringify(jsonEmailData, null, 4).replace(/ /g, ''),
		'utf-8'
	)
} catch (e) {
	throw Error(e)
}
