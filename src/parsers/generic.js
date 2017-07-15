import request from 'request-promise'

class GenericParser {

  constructor() {
    console.log("I am a generic parser");
  }

  parse = (url) =>
    request(url)
}

export default GenericParser
