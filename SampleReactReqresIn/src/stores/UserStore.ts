import { inject, injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";
import ownTypes from "../ioc/ownTypes";
import type { User } from "../models/User";
import type UserService from "../services/UserService";
import i18n from "../locales/config"

@injectable()
export default class UserStore {

    @observable user : User | null = null;
    @observable isLoading = false;
    @observable error = '';
    @observable queryString = '';

    constructor(   
        @inject(ownTypes.userService) private readonly userService: UserService
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
                this.error = i18n.t('user:error.input');
                return;
            }
            const result = await this.userService.getById(id);
            runInAction(()=> {
                this.user = {
                    ...result
                };
            });
            
          } catch (e) {
            if (e instanceof Error) {
                this.queryString = '';
                this.error = e.message;
            }
          }
          runInAction(()=> {
            this.isLoading = false;
        });
    }

    @action
    public changeQueryString = (query: string) : void => {
      this.queryString = query;
    }
}
