import GenericParser from './generic'
import Promise from 'promise'
import Twitter from 'twitter'

class TwitterParser extends GenericParser {
  constructor () {
    super()
    this.client = new Twitter({
      consumer_key: 'ipU4EevS2Ew7nVQBfgHfx7ZSY',
      consumer_secret: 'YPcpt8xSABlspm4d176wpTs5FaeFYDe3LrFg2NugZ1NAO8fXmk',
      access_token_key: '58333811-MMRWbNLAbMlYoqOKQkZj6BWPVekUXmEATreNiAd1S',
      access_token_secret: 'oEGYl6Up0jN9TKXqfyxZMcAYspTmNBaKI0iQhPuWwsAmg'
    })

    this.statusRegex = /https:\/\/twitter.com\/.*\/status\/(.*)/
    this.timelineRegex = /https:\/\/twitter.com\/([^\/]*)$/
  }

  parse = (url) =>
    Promise.resolve(url)
      .then(this._identifySuitableSubParser.bind(this))

  _identifySuitableSubParser = ((url) => {
    if (this.statusRegex.test(url)) {
      return this._parseTweet(url)
    } else if (this.timelineRegex.test(url)) {
      return this._parseTimeline(url)
    } else {
      return super.parse(url)
    }
  })

  _parseTweet = (url) => {
    const id = this.statusRegex.exec(url)[1]
    return this.client.get('statuses/show', {id})
  }

  _parseTimeline = (url) => {
    const user_id = this.timelineRegex.exec(url)[1]
    return this.client.get('statuses/user_timeline', {user_id})
  }
}

export default TwitterParser
