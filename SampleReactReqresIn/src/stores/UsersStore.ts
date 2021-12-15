import { inject, injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";
import ownTypes from "../ioc/ownTypes";
import type { User } from "../models/User";
import type UserService from "../services/UserService";

@injectable()
export default class UsersStore {

    @observable users : User[] = [];
    @observable isLoading = false;
    @observable totalPages = 0;
    @observable currentPage = 1;

    constructor(   
        @inject(ownTypes.userService) private readonly userService: UserService
   ) {
       makeObservable(this);
   }

    @action
    public init = async () => {
        this.getByPage(this.currentPage);
    }

    @action
    public changePage = async (page: number) => {
        this.currentPage = page;
        this.getByPage(page);
    }

    private getByPage = async (page: number) => {
        try {
            this.isLoading = true;
            const result = await this.userService.getByPage(page);
            runInAction(()=> {
                this.users = result.data;
                this.totalPages = result.total_pages;
            });
            
          } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            }
          }
          runInAction(()=> {
            this.isLoading = false;
        });
    }
}
