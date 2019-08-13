import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface SystemPage {
    ts: string;
    total: number;
    list: []
}
export interface SystemSetting {

}

export interface AccountPage {
    ts: string;
    total: number;
    list: []
}
export interface CreateAdmin {

}
export class System {
    @observable
    systemPage: SystemPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    systemSetting: SystemSetting = {

    };
    @observable
    accountPage: AccountPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    createAdmin: CreateAdmin = {

    };
    @action
    async getSystemPage({ data, callback }: ReqData) {
        const res = await request<SystemPage>(urlMaps.getSystemPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.systemPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async saveSystemSetting({ data, callback }: ReqData) {
        const res = await request<SystemSetting>(urlMaps.saveSystemSetting, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.systemSetting = res.data;

        }
        if (callback) {
            callback(res);
        }
    }

    @action
    async getAccountPage({ data, callback }: ReqData) {
        const res = await request<AccountPage>(urlMaps.getAccountPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.accountPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }

    @action
    async CreateAdmin({ data, callback }: ReqData) {
        const res = await request<CreateAdmin>(urlMaps.CreateAdmin, data, {
            method: 'POST',
        });
        if (res.code === 200) {
            this.createAdmin = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
}

export default System;
