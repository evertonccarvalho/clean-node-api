import type { HttpRequest, HttpResponse } from "../protocols/http";
import { InvalidParamsError, MissingParamsError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";

export class SignUpController implements Controller{
	private readonly emailValidator: EmailValidator
	constructor (emailValidator:  EmailValidator){
		this.emailValidator = emailValidator
	}
	handle(httpRequest: HttpRequest): HttpResponse {
		try {
			const requeridFields = ['name', 'email', 'password', 'passwordConfirmation']
			for (const field of requeridFields){
				if(!httpRequest.body[field]){
					return badRequest(new MissingParamsError(field))
				}
			}
			const isValid = this.emailValidator.isValid(httpRequest.body.email)
			if(!isValid){
				return badRequest(new InvalidParamsError("email"))
	
			}
		} catch (error) {
			return serverError()
		}
	}
}
 