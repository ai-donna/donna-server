import { Resource } from '.'

let resource

beforeEach(async () => {
  resource = await Resource.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = resource.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(resource.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = resource.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(resource.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
