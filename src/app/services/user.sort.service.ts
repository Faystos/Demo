import { Injectable } from "@angular/core";
import { IUser, SortSetting } from "../types/user.type";

@Injectable()
export class UserSortService {

  sortUserById(sortSetting: SortSetting, sortItems: IUser[]): IUser[] {
    let sortedArrayByID: IUser[] = [];
    if (sortSetting.direction === 'asc') {
      sortedArrayByID = sortItems.sort((userA, userB) => (+userA[sortSetting.active as 'id'] as number) - (+userB[sortSetting.active as 'id'] as number ));
    }

    if (sortSetting.direction === 'desc') {
      sortedArrayByID = sortItems.sort((userA, userB) => (+userB[sortSetting.active as 'id'] as number ) - (+userA[sortSetting.active as 'id'] as number));
    }

    if (sortSetting.direction === '') {
      sortedArrayByID = sortItems;
    }

    return sortedArrayByID;
  }

  sortUserByDate(sortSetting: SortSetting, sortItems: IUser[]): IUser[] {
    let sortedArrayByDate: IUser[] = [];

    if (sortSetting.direction === 'asc') {
      sortedArrayByDate = sortItems.sort((userA, userB) =>
        (Number(new Date(userA[sortSetting.active as 'dateRegistration'])) - Number(new Date(userB[sortSetting.active as 'dateRegistration']))));

    }

    if (sortSetting.direction === 'desc') {
      sortedArrayByDate = sortItems.sort((userA, userB) =>
        (Number(new Date(userB[sortSetting.active as 'dateRegistration'])) - Number(new Date(userA[sortSetting.active as 'dateRegistration']))));
    }

    if (sortSetting.direction === '') {
      sortedArrayByDate = sortItems;
    }

    return sortedArrayByDate;
  }

  sortUserByFullName(sortSetting: SortSetting, sortItems: IUser[]): IUser[] {
    let sortedArrayByFullName: IUser[] = [];

    if (sortSetting.direction === 'asc') {
      sortedArrayByFullName = sortItems.sort((userA, userB) => {
        if(userA[sortSetting.active as 'fullName'].split(' ')[0].toLowerCase() > userB[sortSetting.active as 'fullName'].split(' ')[0].toLowerCase()) return 1;

        return 0;
      });
    }

    if (sortSetting.direction === 'desc') {
      sortedArrayByFullName = sortItems.sort((userA, userB) => {
        if(userA[sortSetting.active as 'fullName'].split(' ')[0].toLowerCase() < userB[sortSetting.active as 'fullName'].split(' ')[0].toLowerCase()) return -1;

        return 0;
      });
    }

    if (sortSetting.direction === '') {
      sortedArrayByFullName = sortItems;
    }

    return sortedArrayByFullName;
  }
}
