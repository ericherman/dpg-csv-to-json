default: run

check:
	npm install
	npm test

run: clean
	node ./dpgs-transform-main.js

tidy:
	js-beautify --replace --end-with-newline *.js

clean:
	rm -rf out
