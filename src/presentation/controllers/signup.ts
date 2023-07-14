import { MissingParamError } from '../errors/missing-param-error'
import type { HttpResponse, HttpRequest } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse | any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
