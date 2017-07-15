import request from 'request-promise'
import githubScraper from 'github-scraper'
import cheerio from 'cheerio'
import GenericParser from './generic'
import Promise from 'promise'

class GithubParser extends GenericParser {

  constructor() {
    super();
    console.log("I am a Github parser");
  }

  parse(url) {

    Promise.denodify(githubScraper)(url).then(response => {

      var options = {
        uri: url,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      request(options).then(data => {

        let $          = cheerio.load(data);

        response.html  = $("#readme").html();
        response.desc  = $(".repository-meta-content").text();
        response.title = $("#readme h1").first().text();
        console.log(response);
        return Promise.resolve(response);
      });
    })
  }
}

export default GithubParser
