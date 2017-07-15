import { Router } from 'express'
import { ask } from './controller'

const router = new Router()

/**
 * @api {post} /nlp/ask Respond a question
 * @apiGroup nlp
 * @apiSuccess {Object} Question's Response
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 */
router.post('/ask',
  ask)

export default router
