check:
	npm install
	npm test

run:
	node ./dpgs-transform-main.js

tidy:
	js-beautify --replace --end-with-newline *.js
