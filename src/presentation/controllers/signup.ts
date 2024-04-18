import { MissingParamsError } from "../errors/missing-params-erros";
import { badRequest } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import type { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller{
	handle(httpRequest: HttpRequest): HttpResponse {
		const requeridFields = ['name', 'email', 'password', 'passwordConfirmation']
		for (const field of requeridFields){
			if(!httpRequest.body[field]){
				return badRequest(new MissingParamsError(field))
			}
		}
	}
}
 