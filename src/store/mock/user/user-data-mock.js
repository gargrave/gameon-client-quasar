const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiaWF0IjoxNDkyMDE4MTIzLCJleHAiOjE0OTIxMDQ1MjMsImlzcyI6ImZlYXRoZXJzIn0.9idAAfAZsydXRzJYHXEO8Z-_Yam5z0m2qfVl4xg7ROw'

let nextId = 12345

let users = [{
  id: nextId++,
  email: 'email@email.com',
  createdAt: '2016-10-19T22:04:03.670594Z',
  password: 'password'
}]

export default {
  nextId,
  authToken,
  users
}
