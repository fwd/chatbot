![Cover](https://raw.githubusercontent.com/formsend/chatbot/master/.github/cover.png)

> JSON configurable Chatbot Framework for NodeJS


#### This package is in active development by the team at [Formsend](https://formsend.org). It will be the form the backbone of an upcoming feature. API will probably change in the future. PR are welcomed!

## Install

```sh
npm i formsend/chatbot
``` 

## Usage

```js

const ChatBot = require('@formsend/chatbot');

(() => {

	var features = [

		{
			name: "Cookie",
			confirmation: "You want a cookie?",
			triggers: [ "hello", "cookie" ],
			fields: [
				{
					label: "What flavor?",
					name: "flavor",
					validate: (value) => {
						if (value == 'chocolate' || value == 'chocolate') {
							return true
						}
						return "I don't have any of those"
					}
				},
			],
			action: async (fields) => {
				return `🍪`
			}
		},

	]

	// basic example
	/**
	* @param context [string]
	* @param message [string]
	* @param answers [object]
	*/
	var answer = await ChatBot('contextId', 'Hello', answers)

	console.log( answer )

	// express example
	const express = require('express')
	const app = express()
	const port = 3000

	app.get('/', async (req, res) => {
		req.query.message = req.query.message || 'Hello'
		res.send( await ChatBot('contextId', req.query.message, answers) )
	})

	app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
	})

})()

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