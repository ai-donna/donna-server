import { GenericParser, YoutubeParser } from '../parsers'

export const getParser = (url) => {
  if (/youtube.com/.test(url)) {
    console.log('youtube parser')
    return new YoutubeParser()
  } else {
    console.log('generic parser')
    return new GenericParser()
  }
}
