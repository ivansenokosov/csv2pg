

### Description:


### csv-parser-sync-plus-promise



A csv parser to read csv synchronously or as promise and converts it to an array of properties



### Features


now read any csv synchronously or as promise. Choice is yours

This npm csv parser reads csv files synchronously or as a promise to an array

Reading csv synchronously was always hectic, but now its easier and faster. 

### Demo CSV:
	a,b,c
	1,2,3
	1,5,6
	2,4,6

 
### Output Array

	[ { a: '1', b: '2', c: '3' },
	  { a: '1', b: '5', c: '6' },
	  { a: '2', b: '4', c: '5' } ]

### Usage

		let parser = require('csv-parser-sync-plus-promise')

## for use as sync

		let a=parser.readCsvSync('<filepath>')

## for use as promise

		let b=parser.readCsvPromise('<filepath>')


**Note:** You can use both fully qualified and relative paths <filepath>

#### Errors

All errors will be printed as console.error and the process will exit with exit code 222
