import { IResponse } from "../api/response";

export class APIResponse {

    private data: any;
    private message: string;
    private status: boolean;

    constructor(message: string, data: any, status: boolean = true) {
        this.data = data;
        this.message = message;
        this.status = status;
        // this.send();
    }

    public get generate(): IResponse {
        return { message: this.message, data: this.data, status: this.status };
    }

    public get statusCode(): number {
        return 500;
    }
}