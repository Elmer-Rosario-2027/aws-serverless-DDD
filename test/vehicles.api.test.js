const { default: axios } = require('axios')

axios.defaults.baseURL = 'http://localhost:3000/dev/swapi'
// axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`

describe('createItem vehicle', () => {
  it('should respond with statusCode 200 to correct request', async () => {
    // GIVEN
    const payload = { "uuid": "4" }
    // WHEN
    const response = await axios.post('/vehicle', payload)

    // THEN
    expect(response.status).toBe(200)
  })
})

describe('getListItems vehicles', () => {
  it('should respond with statusCode 200 to correct request', async () => {
    // WHEN
    const response = await axios.get('/vehicles')
    // THEN
    expect(response.status).toBe(200)
  })
})