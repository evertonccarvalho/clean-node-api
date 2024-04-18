export class SignUpController {
	handle(httpRequest) {
		httpRequest;
		return {
			statusCode: 400,
			body: new Error("Missing param: name"),
		};
	}
}
