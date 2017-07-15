import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Resource } from '.'

const app = () => express(routes)

let userSession, adminSession, resource

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  resource = await Resource.create({})
})

test('POST /resources 201', async () => {
  const { status, body } = await request(app())
    .post('/')
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /resources 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /resources/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${resource.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(resource.id)
})

test('GET /resources/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /resources/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${resource.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(resource.id)
})

test('PUT /resources/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /resources/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${resource.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /resources/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${resource.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /resources/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${resource.id}`)
  expect(status).toBe(401)
})

test('DELETE /resources/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
