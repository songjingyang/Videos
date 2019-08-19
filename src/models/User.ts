import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
export interface UserInfo {
  avatar: string;
  created_at: string;
  email: string;
  id: number;
  merchant_id: string;
  name: string;
  nickname: string;
  phone: string;
  status: number;
  updated_at: string;
}
export interface EditInfo {}
export interface ForgetPassInfo {}
export interface CodeBack{
  code :number
}
export class User {
         @observable
         userInfo: UserInfo = {
        avatar: '',
        created_at: '',
        email: '',
        id: 0,
        merchant_id: '',
        name: '',
        nickname: '',
        phone: '',
        status: 0,
        updated_at: '',
         };
         @observable
         editInfo: EditInfo = {};
         @observable
         forgetPassInfo: ForgetPassInfo = {};
         @observable
         codeBack: CodeBack = {
           code: 0,
         };

         @action
         async login({ data, callback }: ReqData) {
           const res = await request<UserInfo>(urlMaps.login, data, {
             method: 'POST',
           });
           if (res.code === 200) {
             const data: any = res.data;
             const user_cloud = data as UserInfo;
             this.userInfo = user_cloud;
             localStorage.setItem('user_cloud', JSON.stringify(user_cloud));
           }
           if (callback) {
             callback(res);
           }
         }
         @action
         async logout({ data, callback }: ReqData) {
           const res = await request<UserInfo>(urlMaps.logout, data, {
             method: 'POST',
           });
           if (res.code === 200) {
             localStorage.removeItem('user_cloud');
           }
           if (callback) {
             callback(res);
           }
         }
         @action
         async editPass({ data, callback }: ReqData) {
           const res = await request<EditInfo>(urlMaps.editPass, data, {
             method: 'POST',
           });

           if (res.data === 200) {
             const data: any = res.data;
             const user = data as EditInfo;
             this.editInfo = user;
           }
           if (callback) {
             callback(res);
           }
         }
         @action
         async forgetPass({ data, callback }: ReqData) {
           const res = await request<ForgetPassInfo>(
             urlMaps.forgetPass,
             data,
             {
               method: 'POST',
             }
           );

           if (res.data === 200) {
             this.forgetPassInfo = res.data;
           }
           if (callback) {
             callback(res);
           }
         }
         @action
         async sendPhoneCode({ data, callback }: ReqData) {
           const res = await request<CodeBack>(urlMaps.sendCode, data, {
             method: 'POST',
           });

           if (res.code === 200) {
             this.codeBack = res.data;
           }
           if (callback) {
             callback(res);
           }
         }
       }

export default User;
