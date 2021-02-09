# cypress automation with lighthouse from a XLS file 

## Dynamically generate data from CSV or XLS files

1º - To Install `npm install` 

2º - To convert Excel files to JSON: `npm run convertXLStoJSON`

- File:- `testData/convertXLStoJSON.ts`
- Input:- `testData/urls.xlsx`
- Output:- `cypress/fixtures/urls.json`

3º - To run : `npx cypress open` 

In the excel file specify the header as shown in the image below. 

<a href="https://imgur.com/d0dtzUr"><img src="https://i.imgur.com/d0dtzUr.png" title="source: imgur.com" /></a>

Also the sender email has to have the application security turned off, for this you have to go to Manage account > Security and : 

<a href="https://imgur.com/AFKoGbP"><img src="https://i.imgur.com/AFKoGbP.png" title="source: imgur.com" /></a>
