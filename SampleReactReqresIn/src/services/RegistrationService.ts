import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ContentType, MethodType } from './HttpService';
import type { HttpService } from './HttpService';
import ownTypes from '../ioc/ownTypes';
import type { RegistrationResponse } from '../dtos/RegistrationResponse';

export interface RegistrationService {
  register(email: string, password: string): Promise<RegistrationResponse>;
}

@injectable()
export default class DefaultRegistrationService implements RegistrationService {
  public constructor(@inject(ownTypes.httpService) private readonly httpService: HttpService) {}

  public async register(email: string, password: string): Promise<RegistrationResponse> {
    const headers = { contentType: ContentType.Json };
    const data = { email, password };
    const result = await this.httpService.send<RegistrationResponse>(`register`, MethodType.POST, headers, data);
    return result.data;
  }
}
