import type { HttpResponse, HttpRequest, Controller, EmailValidator } from '../protocols'
import { badRequest, serverError } from '../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../errors'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | any {
    try {
      const requireFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
