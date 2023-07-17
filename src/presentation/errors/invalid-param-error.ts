export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Ivalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
