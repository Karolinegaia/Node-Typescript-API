import { SignupController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { type EmailValidator } from '../protocols/validator-email'

interface SutTypes {
  sut: SignupController
  emailValidatorStub: EmailValidator
}
const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignupController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}
describe('Signup Controller', () => {
  test('Shold return 400 if  no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'teste@teste.com',
        password: 'senha',
        passowordConfirmation: 'senha'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Shold return 400 if  no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'karol',
        password: 'senha',
        passwordConfirmation: 'senha'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Shold return 400 if  no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'karol',
        email: 'teste@teste.com',
        passowordConfirmation: 'senha'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Shold return 400 if  no password Confirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'karol',
        email: 'teste@teste.com',
        password: 'senha'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
  test('Shold return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any',
        email: 'invalid_mail@mail.com',
        password: 'any',
        confirmPassword: 'any'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
  test('Shold call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_karol',
        email: 'any_teste@teste.com',
        password: 'any_senha',
        passwordConfirmation: 'any_senha'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_teste@teste.com')
  })
  test('Shold return 500 if EmailValidator throws ', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignupController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'any-karol',
        email: 'any_email@email.com',
        password: 'any-senha',
        passowordConfirmation: 'any-senha'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
