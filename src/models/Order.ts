import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface OrderPage {
    ts: string;
    total: number;
    list: []
}
export interface AuditPage {
    ts: string;
    total: number;
    list: []
}
export class Order {
    @observable
    orderPage: OrderPage = {
        ts: "",
        total: 0,
        list: []
    };
    @observable
    auditPage: AuditPage = {
        ts: "",
        total: 0,
        list: []
    };
    @action
    async getOrderPage({ data, callback }: ReqData) {
        const res = await request<OrderPage>(urlMaps.getOrderPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.orderPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
    @action
    async getAuditPage({ data, callback }: ReqData) {
        const res = await request<AuditPage>(urlMaps.getAuditPage, data, {
            method: 'GET',
        });
        if (res.code === 200) {
            this.auditPage = res.data;

        }
        if (callback) {
            callback(res);
        }
    }
}

export default Order;
