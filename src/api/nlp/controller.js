import apiai from 'apiai'
import { success } from '../../services/response/'
import uuid from 'uuid/v4'
import Promise from 'promise'

const app = apiai('749af6a1d2634e209dc08f1ee2521c3b')
//const app = apiai('e9487e979f614009838222984498c608')

const textRequest = Promise.denodeify(app.textRequest)

export const ask = ({ body }, res, next) => {
  const request = app.textRequest(body.question, {
    sessionId: uuid()
  })
  request.on('response', (response) => {
    console.log(response)
    success(res)(response)
  })

  request.on('error', (error) => {
    console.log(error)
    next(error)
  })

  request.end()
}
