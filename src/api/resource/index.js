import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export Resource, { schema } from './model'

const router = new Router()

/**
 * @api {post} /resources Create resource
 * @apiName CreateResource
 * @apiGroup Resource
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 */
router.post('/',
  create)

/**
 * @api {get} /resources Retrieve resources
 * @apiName RetrieveResources
 * @apiGroup Resource
 * @apiUse listParams
 * @apiSuccess {Object[]} resources List of resources.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /resources/:id Retrieve resource
 * @apiName RetrieveResource
 * @apiGroup Resource
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /resources/:id Update resource
 * @apiName UpdateResource
 * @apiGroup Resource
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /resources/:id Delete resource
 * @apiName DeleteResource
 * @apiGroup Resource
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Resource not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
