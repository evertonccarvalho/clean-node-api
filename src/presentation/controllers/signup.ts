import { MissingParamsError } from "../errors/missing-params-erros";
import { badRequest } from "../helpers/http-helper";
import type { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
	handle(httpRequest: HttpRequest): HttpResponse {
		const requeridFields = ['name', 'email']
		for (const field of requeridFields){
			if(!httpRequest.body[field]){
				return badRequest(new MissingParamsError(field))
			}
		}
	}
}
