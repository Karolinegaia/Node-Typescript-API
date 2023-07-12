import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Shold return 400 if  no name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        email: 'teste@teste.com',
        password: 'senha',
        passowordConfirmation: 'senha'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
