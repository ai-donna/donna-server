import Promise from 'promise'
import cheerio from 'cheerio'

export const readHtml = (html) => {
  return Promise.resolve(html)
    .then((html) => cheerio.load(html))
    .then((doc) => doc.text())
}
