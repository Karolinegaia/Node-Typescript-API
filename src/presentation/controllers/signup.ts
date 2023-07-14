import { MissingParamError } from '../errors/missing-param-error'
import type { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest } from '../helpers/http-helpers'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse | any {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
