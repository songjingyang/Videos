import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface MessagePage {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export class Message {
  @observable
  messagePage: MessagePage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };
  @action
  async getMessagePage({ data, callback }: ReqData) {
    const res = await request<MessagePage>(urlMaps.getMessagePage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.messagePage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteRecord({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteRecord, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.deleteInfo = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
}

export default Message;
