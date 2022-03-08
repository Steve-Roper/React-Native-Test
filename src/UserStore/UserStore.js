import React from 'react';
import type {Node} from 'react';
import {action, makeAutoObservable, makeObservable, observable} from 'mobx';

export class User {
  id = Math.random();
  name = '';

  constructor(name) {
    makeAutoObservable(this);
    this.name = name;
  }
}

export class UserStore {
  activeUser = null;
  users = [];

  constructor(users) {
    makeObservable(this, {
      activeUser: observable,
      users: observable,
      changeActiveUser: action,
    });
    this.users = users;
    this.activeUser = users[0];
  }

  changeActiveUser(user) {
    this.activeUser = user;
  }
}

export const StoreContext = React.createContext();

export const StoreProvider: () => Node = ({children, store}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
