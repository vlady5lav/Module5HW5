import { inject, injectable } from 'inversify';
import { action, makeObservable, observable, runInAction } from 'mobx';
import ownTypes from '../ioc/ownTypes';
import type RegistrationService from '../services/RegistrationService';

enum Gender {
  Male,
  Female,
}

@injectable()
export default class RegistrationStore {
  @observable email = '';
  @observable emailConfirmation = '';
  @observable password = '';
  @observable passwordConfirmation = '';
  @observable firstName = '';
  @observable lastName = '';
  @observable gender = '';
  @observable isLoading = false;
  @observable error = '';
  @observable token = '';
  @observable id = -1;

  constructor(
    @inject(ownTypes.registrationService)
    private readonly registrationService: RegistrationService
  ) {
    makeObservable(this);
  }

  @action
  public register = async () => {
    this.token = '';
    this.id = -1;
    this.error = '';

    try {
      this.isLoading = true;

      if (!this.stringsComparer(this.email, this.emailConfirmation)) {
        runInAction(() => {
          this.error = 'Emails are not equal!';
          this.isLoading = false;
        });

        return;
      }

      if (!this.stringsComparer(this.password, this.passwordConfirmation)) {
        runInAction(() => {
          this.error = 'Passwords are not equal!';
          this.isLoading = false;
        });

        return;
      }

      const result = await this.registrationService.register(this.email, this.password);
      runInAction(() => {
        this.token = result.token;
        this.id = result.id;
      });
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };

  @action
  public changeFirstName = (firstName: string): void => {
    this.firstName = firstName;
  };

  @action
  public changeLastName = (lastName: string): void => {
    this.lastName = lastName;
  };

  @action
  public changeGender = (gender: Gender) => {
    this.gender = Gender[gender];
  };

  @action
  public changeEmail = (text: string): void => {
    this.email = text;
  };

  @action
  public changeEmailConfirmation = (text: string): void => {
    this.emailConfirmation = text;
  };

  @action
  public changePassword = (text: string): void => {
    this.password = text;
  };

  @action
  public changePasswordConfirmation = (text: string): void => {
    this.passwordConfirmation = text;
  };

  private stringsComparer(first: string, second: string): boolean {
    if (first === second) {
      return true;
    } else {
      return false;
    }
  }
}
