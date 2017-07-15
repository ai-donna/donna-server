import { Nlp } from '.'

let nlp

beforeEach(async () => {
  nlp = await Nlp.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = nlp.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(nlp.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = nlp.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(nlp.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
