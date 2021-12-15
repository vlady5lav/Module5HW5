import "reflect-metadata";
import { inject, injectable } from "inversify";
import { MethodType } from "./HttpService";
import type { HttpService } from "./HttpService";
import ownTypes from "../ioc/ownTypes";
import type { UserDto } from "../dtos/UserDto";
import type { UserResponse } from "../dtos/UserResponse";
import type { UsersDto } from "../dtos/UsersDto";

export interface UserService {
    getById(id: number): Promise<UserDto>;
    getByPage(page: number): Promise<UsersDto>;
}

@injectable()
export default class DefaultUserService implements UserService {
    public constructor(
        @inject(ownTypes.httpService) private readonly httpService: HttpService
    ) {
    }

    public async getById(id: number): Promise<UserDto> {
        const result = await this.httpService.send<UserResponse>(`users/${id}`, MethodType.GET);
        return result.data.data;
    }

    public async getByPage(page: number): Promise<UsersDto> {
        const result = await this.httpService.send<UsersDto>(`users?page=${page}`, MethodType.GET);
        return {...result.data};
    }
}

