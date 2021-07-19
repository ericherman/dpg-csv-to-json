default: run

node_modules/csvtojson/package.json:
	npm install

csvtojson: node_modules/csvtojson/package.json

check: csvtojson
	npm test

run: clean csvtojson
	node ./dpgs-transform-main.js

tidy:
	js-beautify --replace --end-with-newline *.js

clean:
	rm -rf out
