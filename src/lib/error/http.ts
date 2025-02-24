import { UserFacingError } from './main';

export class HttpError extends UserFacingError {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(`HTTP | ${message}`);
		this.statusCode = statusCode;
	}
}

export class ForbiddenError extends HttpError {
	constructor(message: string) {
		super(`FORBIDDEN | ${message}`, 403);
	}
}
