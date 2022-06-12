![Cover](https://raw.githubusercontent.com/fwd/chatbot/master/.github/hero.png)

> Modular NodeJS Chatbot Framework

## Install

```sh
npm i @fwd/chatbot
``` 

## Express Example
```javascript
const ChatBot = require('@fwd/chatbot')
const express = require('express')
const app = express()
const port = 3000

var answers = [
	{
		name: "Cookie",
		confirmation: "Do you want a cookie?",
		triggers: [ "cookie" ],
		fields: [
			{
				label: "What flavor?",
				name: "flavor"
			},
		],
		action: async (fields) => {
			console.log( fields.flavor )
			return `🍪`
		}
	},
]

app.get('/', async (req, res) => {
	if (!req.query.message) return res.send("Message is required.")
	res.send( await ChatBot('contextId', req.query.message, answers) )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### Terminal Chatbot 😎

```javascript
const ChatBot = require('@fwd/chatbot')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var answers = [
	{
		name: "Cookie",
		confirmation: "Do you want a cookie?",
		triggers: [ "cookie" ],
		fields: [
			{
				label: "What flavor?",
				name: "flavor"
			},
		],
		action: async (fields) => {
			console.log( fields )
			return `🍪`
		}
	},
]

var recursiveAsyncReadLine = function () {
  rl.question('> ', async (answer) => {
    if (answer == 'exit') return rl.close()
    if (answer == 'clear') return console.clear()
    console.log( await ChatBot('jenkins', answer, answers) )
    recursiveAsyncReadLine();
  });
};

recursiveAsyncReadLine();
```

## ❯ Contributing

Give a ⭐️ if this project helped you!

Contributions, issues and feature requests are welcome at [issues page](https://github.com/fwd/chatbot/issues).

## ❯ License

MIT License

Copyright © [@nano2dev](https://twitter.com/nano2dev).

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## ❯ Stargazers

[![Stargazers over time](https://starchart.cc/fwd/n2.svg)](https://github.com/fwd/n2)
