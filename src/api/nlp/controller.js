import apiai from 'apiai'
import { success } from '../../services/response/'
import uuid from 'uuid/v4'
import _ from 'lodash'
import elasticsearch from 'elasticsearch'
import { Resource } from '../resource'

const app = apiai('749af6a1d2634e209dc08f1ee2521c3b')

const client = new elasticsearch.Client({ host: 'localhost:9200', log: 'trace' })

export const ask = ({ body }, res, next) => {
  const request = app.textRequest(body.question, {
    sessionId: uuid()
  })
  request.on('response', (response) => {
    console.log(response)
    Promise.resolve(response)
      .then(performAction)
      .then(success(res))
  })

  request.on('error', (error) => {
    console.log(error)
    next(error)
  })

  request.end()
}

const performAction = (response) => {
  switch (response.result.action) {
    case 'resource.search':
      return resourceSearch(response)
    case '':
    default:
      return response
  }
}

const resourceSearch = (response) =>
  Promise.resolve(response.result)
    // .then(result => {
    //   return client.search({
    //     index: 'donna',
    //     q: `${result.parameters.resource}:*`
    //   })
    // })
    .then(result =>
      Resource.find({type: result.parameters.resource, title: {$regex: result.parameters.topic}}))
    .then(searchResults => _.assign({
      searchResults
    }, response))
