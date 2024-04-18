import { MissingParamsError } from "../errors/missing-params-erros";
import { SignUpController } from "./signup";

describe("SignUp Controller", () => {
	test("Should rterun 400 if no name is provided", () => {
		const sut = new SignUpController();
		const httpRequest = {
			body: {
				email: "any_email@email.com",
				password: "any_password",
				passwrodConfirmation: "any_password",
			},
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamsError("name"));
	});

	test("Should rterun 400 if no email is provided", () => {
		const sut = new SignUpController();
		const httpRequest = {
			body: {
				name: "any_name",
				password: "any_password", 
				passwrodConfirmation: "any_password",
			},
		};
		const httpResponse = sut.handle(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamsError("email"));
	});
});
