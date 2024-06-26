import { Controller, EmailValidator, HttpRequest, HttpResponse, AddAccount  } from "./signup-protocols";
import { InvalidParamsError, MissingParamsError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";

export class SignUpController implements Controller{
	private readonly emailValidator: EmailValidator
	private readonly addAccount: AddAccount
	constructor (emailValidator:  EmailValidator, addAccount: AddAccount){
		this.emailValidator = emailValidator
		this.addAccount = addAccount
	}
	async handle(httpRequest: HttpRequest):Promise <HttpResponse> {
		try {
			const requeridFields = ['name', 'email', 'password', 'passwordConfirmation']
			for (const field of requeridFields){
				if(!httpRequest.body[field]){
					return badRequest(new MissingParamsError(field))
				}
			}
			const {name, email, password, passwordConfirmation} = httpRequest.body
			if(password !== passwordConfirmation){
				return badRequest(new InvalidParamsError("passwordConfirmation"))
			}
			const isValid = this.emailValidator.isValid(email)
			if(!isValid){
				return badRequest(new InvalidParamsError("email"))
	
			}
			const account = await this.addAccount.add({
				name,
				email,
				password
			})

			return ok(account)
			
		} catch (error) {
			return serverError()
		}
	}
}
 