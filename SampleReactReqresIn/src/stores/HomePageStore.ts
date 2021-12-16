import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';

export enum TabsType {
  Login,
  Registration,
  Resource,
  Resources,
  User,
  Users,
}

@injectable()
export default class HomePageStore {
  @observable currentTab = TabsType[TabsType.Users];

  constructor() {
    makeObservable(this);
  }

  @action
  public changeTab = (tab: string | null): void => {
    this.currentTab = !!tab ? tab : TabsType[TabsType.Users];
  };
}
