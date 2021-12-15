import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ContentType, MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import ownTypes from "../ioc/ownTypes";
import type { LoginResponse } from "../dtos/LoginResponse";

export interface AuthenticationService {
    login(email: string, password: string): Promise<LoginResponse>;
}

@injectable()
export default class DefaultAuthenticationService implements AuthenticationService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public async login(email: string, password: string): Promise<LoginResponse> {
        const headers = { contentType: ContentType.Json};
        const data = { email, password };
        const result = await this.httpService.send<LoginResponse>(`login`, MethodType.POST, headers, data);
        return result.data;
    }
}