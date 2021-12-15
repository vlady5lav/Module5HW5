import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

export enum TabsType {
  User,
  Users,
  Login
}

@injectable()
export default class HomePageStore {

    @observable currentTab = TabsType[TabsType.User];

    constructor(   
   ) {
       makeObservable(this);
   }

    @action
    public changeTab = (tab: string | null) : void => {
      this.currentTab = !!tab ? tab : TabsType[TabsType.User];
    }
}
