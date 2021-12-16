import { inject, injectable } from 'inversify';
import { action, makeObservable, observable, runInAction } from 'mobx';
import ownTypes from '../ioc/ownTypes';
import type { Resource } from '../models/Resource';
import type ResourceService from '../services/ResourceService';
import i18n from '../locales/config';

@injectable()
export default class ResourceStore {
  @observable resource: Resource | null = null;
  @observable isLoading = false;
  @observable error = '';
  @observable queryString = '';

  constructor(
    @inject(ownTypes.resourceService)
    private readonly resourceService: ResourceService
  ) {
    makeObservable(this);
  }

  @action
  public search = async () => {
    this.error = '';
    try {
      this.isLoading = true;
      const id = Number(this.queryString);
      if (id === NaN) {
        this.queryString = '';
        this.error = i18n.t('resource:error.input');
        return;
      }
      const result = await this.resourceService.getById(id);
      runInAction(() => {
        this.resource = {
          ...result,
        };
      });
    } catch (e) {
      if (e instanceof Error) {
        this.queryString = '';
        this.error = e.message;
      }
    }
    runInAction(() => {
      this.isLoading = false;
    });
  };

  @action
  public changeQueryString = (query: string): void => {
    this.queryString = query;
  };
}
