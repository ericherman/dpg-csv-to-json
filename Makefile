run:
	node ./dpgs-transform.js

tidy:
	js-beautify --replace --end-with-newline *.js
