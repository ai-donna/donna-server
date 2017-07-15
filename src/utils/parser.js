import { GenericParser, YoutubeParser, GithubParser } from '../parsers'

export const getParser = (url) => {
  if (/youtube.com/.test(url)) {
    console.log('youtube parser')
    return new YoutubeParser()
  } else if (/github.com/.test(url)) {
    console.log("github parse");
    return new GithubParser();
  } else {
    console.log('generic parser')
    return new GenericParser()
  }
}
