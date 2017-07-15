import { GenericParser, YoutubeParser, GithubParser, TwitterParser } from '../parsers'

export const getParser = (url) => {
  if (/youtube.com/.test(url)) {
    console.log('youtube parser')
    return new YoutubeParser()
  } else if (/github.com/.test(url)) {
    console.log('github parse')
    return new GithubParser()
  } else if (/twitter.com/.test(url)) {
    console.log('twitter parse')
    return new TwitterParser()
  } else {
    console.log('generic parser')
    return new GenericParser()
  }
}
