// ------------------------------
// Auth Test
// ------------------------------

const request = require('supertest')
require('dotenv').config({ path: '.env.test' })
const app = require('../app')

const admin = {
  'email': 'admin@localhost.local',
  'password': '1234',
}

// POST
describe('POST /login', () => {
  it('Should login into app', async () => {
    const res = await request(app).post('/auth/login').send(admin)
    expect(res.statusCode).toEqual(200)
    expect(typeof res.body).toEqual('object')
    expect(res.body.user.roles[0]).toEqual('admin')

    // Set token to other tests
    admin.token = res.body.token
  })
})

// GET
describe('GET /', () => {
  it('Should return a list of users', async () => {
    const res = await request(app).get('/users').set('Authorization', admin.token).send()
    expect(res.statusCode).toEqual(200)
    expect(typeof res.body).toEqual('object')
  })
})
