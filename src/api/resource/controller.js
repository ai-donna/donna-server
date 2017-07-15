import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Resource } from '.'
import { getParser } from '../../utils/parser'
import elasticsearch from 'elasticsearch'

const client = new elasticsearch.Client({ host: 'localhost:9200', log: 'trace' })

export const create = ({ body }, res, next) =>
  Resource.create(body)
    .then((resource) => resource.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Resource.find(query, select, cursor)
    .then((resources) => resources.map((resource) => resource.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? resource.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? _.merge(resource, body).save() : null)
    .then((resource) => resource ? resource.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Resource.findById(params.id)
    .then(notFound(res))
    .then((resource) => resource ? resource.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const interpret = ({ body }, res, next) => {
  Promise.resolve(body.url)
    .then(getParser.bind(this))
    .then((parser) => parser.parse(body.url).then(parser._format))
    .then(response => {
      Resource.create(response)
      return response
    })
    .then(response => {
      client.create({
        index: 'donna',
        type: response.type,
        id: response.id,
        body: response
      })
      return response
    })
    .then(success(res))
    .catch(next)
}
