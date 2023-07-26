import { type EmailValidator } from '../presentation/protocols/validator-email'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
