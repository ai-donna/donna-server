import request from 'request-promise'

class GenericParser {
  parse = (url) =>
    request(url)
}

export default GenericParser
