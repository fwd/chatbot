const _ = require('lodash')
const cache = require('@fwd/cache')

const greetings = [ 'Hello', 'How can I help?', 'Yo', "What's Up?", 'Sup', 'How can I be of assistance?' ]
const confirmations = [ 'Done.', 'Confirmed.', 'Consider it done.', 'Finished.' ]
const thanks = [ "Np", "You're very welcome.", "All good.", "You're welcomed.", "Got chu, fam.", "Don't mention it." ]
const oks = [ "Ok", "Np", "Aight", "Sure" ]

function validEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validPhone(phone) {
    var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(phone);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2; shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) return 1.0
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function answerQuestion(id, question, answer) {

    var conversation = cache(id)
    
            question.value = answer

    cache(id, conversation)

}

function unansweredQuestions(id, message) {

    var conversation = cache(id)

    if (!conversation || !conversation.fields || !conversation.fields.length) return false

    var unanswered = conversation.fields.filter(a => !a.value)

    if (!unanswered[0]) return false

    return unanswered[0]

}

function thanked(msg) {
    msg = msg.toLowerCase()
    return msg == 'thanks' || msg == 'thank you' || msg == 'thx' || msg == 'gracias'
}

function agreed(msg) {
    msg = msg.toLowerCase()
    return msg == 'yes' || msg == 'yea' || msg == 'yeah' || msg == 'mhm' || msg == 'si' || msg == 'yep' || msg == 'please' || msg == 'sure' || msg == 'alright'
}

function cancel(msg) {
    msg = msg.toLowerCase()
    return msg == 'nvm' || msg == 'never mind' || msg == 'cancel'
}

module.exports = (id, message, capabilities, config) => {

    return new Promise(async (resolve, reject) => {

        config = config || {}

        // check if conversion exists
        let conversation = cache(id)

        if (!conversation && thanked(message)) {
            resolve( _.sample(config.thanks || thanks) )
            return
        }

        if (cancel(message) || conversation && !conversation.confirmed && message.toLowerCase() == 'no') {
            resolve( _.sample(config.oks || oks) )
            conversation = false
            cache(id, false)
            return
        }

        // if not, find a matching feature
        if (!conversation) {
            conversation = JSON.parse(JSON.stringify(capabilities)).find(a => {
                return a.triggers.includes(message.toLowerCase()) || a.triggers.some(b => similarity(b, message.toLowerCase()) > 0.5)
            })
        }

        // if not, tell user
        if (!conversation) {
            resolve( _.sample(config.greetings || greetings) )
            return
        }
        
        // if yes, ask user if that's what they want to do
        if (!conversation.confirmed && !agreed(message)) {
            cache(id, conversation)
            if (Array.isArray(conversation.confirmation)) conversation.confirmation = _.sample(conversation.confirmation)
            resolve(conversation.confirmation || `Are you sure you want to run ${conversation.name}`)
            return
        }
        
        // if yes, load feature into memory and ask first question
        if (!conversation.confirmed && agreed(message)) {
            conversation.confirmed = true
            cache(id, conversation)
            if (unansweredQuestions(id)) {
                resolve( unansweredQuestions(id).label )
                return
            }
        }

        var question = unansweredQuestions(id)
        
        var _question = capabilities.find(a => {
                return a.fields.find(b => b.label == question.label && b.name == question.name)
              })
        
        if (_question) {
            _question = _question.find(b => b.label == question.label && b.name == question.name)
        }

        if (_question && _question.type) {
            if (_question.type == 'email' && !validEmail(message)) {
                resolve("Answer must be valid email.")
                return
            }
            if (_question.type == 'number' && !parseFloat(message)) {
                resolve("Answer must be valid number.")
                return
            }
            if (_question.type == 'phone' && !validPhone(message)) {
                resolve("Answer must be valid phone number.")
                return
            }
        }

        if (_question && _question.validate) {
            var answer = await _question.validate(message)
            if (answer !== true) {
                var response = Array.isArray(answer) ? _.sample(answer) : answer
                resolve(response)
                return
            }
        }

        if (_question && _question.format) message = _question.format(message)

        if (question) {
            answerQuestion(id, question, message)
            var question = unansweredQuestions(id)
            if (question) return resolve( question.label )
        }

        if (conversation.confirmed && !question) {
            var response = ''
            var feature = capabilities.find(a => a.name == conversation.name)
            if (feature) {
                response = await feature.action(conversation.fields)
                if (Array.isArray(response)) response = _.sample(response)
            }
            resolve( typeof response == 'string' ? response : _.sample(config.confirmations || confirmations) )
            conversation = false
            cache(id, false)
            return
        }

    })

}
