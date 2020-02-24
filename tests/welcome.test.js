// ------------------------------
// Welcome Test
// ------------------------------

const request = require('supertest')
require('dotenv').config({ path: '.env.test' })
const app = require('../app')

// GET
describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/').send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual('Welcome API')
  })
})
