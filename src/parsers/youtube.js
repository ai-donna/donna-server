import request from 'request-promise'
import GenericParser from './generic'

class YoutubeParser extends GenericParser {
  parse = (url) =>
    request(url)
}

export default YoutubeParser
