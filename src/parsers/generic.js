import request from 'request-promise'
import NLP from 'watson-developer-cloud/natural-language-understanding/v1'

class GenericParser {

  constructor() {
    console.log("I am a generic parser");
  }

  parse = (url) =>
    Promise.resolve(url)
    .then(() => {
      const SEMANTRIA_KEY = "041c81a5-422a-4127-993f-9816b42f4725";
      const SEMANTRIA_SECRET = "c6572494-737b-4b33-93f6-ab9c2dbe2fe8";
      return request(`https://api.diffbot.com/v3/article?token=61726f594b0848436a14b04863e7e3b5&url=${url}&textAnalysis&semantriaKey=${SEMANTRIA_KEY}&semantriaSecret=${SEMANTRIA_SECRET}`)
    })
}

export default GenericParser
