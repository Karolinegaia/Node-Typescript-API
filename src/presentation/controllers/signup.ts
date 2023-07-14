import { MissingParamError } from '../errors/missing-param-error'
import type { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest } from '../helpers/http-helpers'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse | any {
    const requireFields = ['name', 'email']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
