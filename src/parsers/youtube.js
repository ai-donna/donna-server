import GenericParser from './generic'
import Youtube from 'youtube-node'
import Promise from 'promise'
import _ from 'lodash'

const YOUTUBE_KEY = 'AIzaSyDjnFOup378dHY1HaQCWToCkNc6UieZVW4'

class YoutubeParser extends GenericParser {
  constructor () {
    super()
    console.log('I am a youtube parser')
    this.Youtube = new Youtube()
    this.Youtube.setKey(YOUTUBE_KEY)
    this._getById = Promise.denodeify(this.Youtube.getById)
  }

  parse = (url) =>
    Promise.resolve(url)
      .then(this._getVideoId)
      .then(this._getById)

  _getVideoId = (url) =>
    Promise.resolve(url)
      .then((url) => {
        var id = url.split('v=')[1]
        var ampersandPosition = id.indexOf('&')
        if (ampersandPosition !== -1) {
          id = id.substring(0, ampersandPosition)
        }
        return id
      })

  _format = (response, url) => _.assign({
    id: response.id,
    type: 'video',
    url,
    title: _.get(response, 'items[0].title'),
    summary: _.get(response, 'items[0].description'),
    contextualData: {
      image: _.get(response, 'items[0].snippet.thumbnails.high.url'),
      videoUri: url
    }
  })
}

export default YoutubeParser
