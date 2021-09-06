![Cover](https://raw.githubusercontent.com/formsend/chatbot/master/.github/hero.png)

> Open Source Chatbot Framework for NodeJS, configurable with JSON.

#### This package is in active development by the team at [Formsend](https://formsend.org). It will form the backbone of an upcoming feature. API will probably change in the future. Pull Requests and Feature Requests are welcomed.

## Install

```sh
npm i formsend/chatbot
``` 

## Express Example
```javascript
const ChatBot = require('@formsend/chatbot')
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
const ChatBot = require('@formsend/chatbot')
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

## 👤 Author

**Formsend**

> Formsend is an alternative to Google Forms and Formspree. Easily create online forms with a form builder, and/or add a widget to your website in seconds. Built for simplicity, privacy & reliability.

* Github: [@formsend](https://github.com/formsend)
* Website: [https://formsend.org](https://formsend.org)

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/formsend/chatbot/issues).

## ♥️ Donate 

We accept Crypto donations at the following addresses: 

```
# Nano
nano_3gf57qk4agze3ozwfhe8w6oap3jmdb4ofe9qo1ra3wcs5jc888rwyt61ymea

# Bitcoin
bc1qcgvew2a7ta3f7xy5999tdwyd8clrvdtpe2uvj5

# Doge
D9U1FLygkMydx3DE2sXgnuFpHm7ePm3Zwe

# Ethereum
0xdD4691Dc9562FB262e4b2076bE255303243f271d
```

## 📝 License

MIT License

Copyright © 2021 [Forward Miami](https://forward.miami).

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
