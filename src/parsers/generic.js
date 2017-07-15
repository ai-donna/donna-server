import request from 'request-promise'
import cheerio from 'cheerio'

class GenericParser {

  constructor () {
    console.log('I am a generic parser')
  }

  parse = (url) =>
    request(url)
      .then((html) => cheerio.load(html))
      .then(($) => $.text())

  _print = (str) => {
    console.log(str)
    return JSON.stringify(str)
  }

}

export default GenericParser
