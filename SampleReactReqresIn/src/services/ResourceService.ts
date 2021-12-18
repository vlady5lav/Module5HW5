import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { MethodType } from './HttpService';
import type { HttpService } from './HttpService';
import ownTypes from '../ioc/ownTypes';
import type { ResourceDto } from '../dtos/ResourceDto';
import type { ResourceResponse } from '../dtos/ResourceResponse';
import type { ResourcesDto } from '../dtos/ResourcesDto';

export interface ResourceService {
  getById(id: number): Promise<ResourceDto>;
  getByPage(page: number): Promise<ResourcesDto>;
}

@injectable()
export default class DefaultUserService implements ResourceService {
  public constructor(@inject(ownTypes.httpService) private readonly httpService: HttpService) {}

  public async getById(id: number): Promise<ResourceDto> {
    const result = await this.httpService.send<ResourceResponse>(`unknown/${id}`, MethodType.GET);
    return result.data.data;
  }

  public async getByPage(page: number): Promise<ResourcesDto> {
    const result = await this.httpService.send<ResourcesDto>(`unknown?page=${page}`, MethodType.GET);
    return { ...result.data };
  }
}
