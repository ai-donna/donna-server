import request from 'request-promise'
import githubScraper from 'github-scraper'
import cheerio from 'cheerio'
import GenericParser from './generic'
import Promise from 'promise'
import _ from 'lodash'

class GithubParser extends GenericParser {

  constructor () {
    super()
    console.log('I am a Github parser')
    this._githubScraper = Promise.denodeify(githubScraper)
  }

  parse = (url) =>
    Promise.resolve(url)
      .then(this._githubScraper.bind(this))
      .then((response) => {
        const options = {
          uri: url,
          transform: function (body) {
            return cheerio.load(body)
          }
        }

        return request(options)
          .then($ => {
            response.html = $('#readme').html()
            response.desc = $('.repository-meta-content').text()
            response.title = $('#readme h1').first().text()
            return Promise.resolve(response)
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))

  _format = (response, url) => _.assign({
    type: 'github',
    url,
    id: response.url
  }, response)
}

export default GithubParser
