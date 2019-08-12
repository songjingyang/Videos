import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface ChatList {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export interface UserStatus {

}
export class Chat {
  @observable
  chatList: ChatList = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };
  @observable
  userStatus: UserStatus = {
    
  };
  @action
  async getChatList({ data, callback }: ReqData) {
    const res = await request<ChatList>(urlMaps.getChatList, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.chatList = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteChat({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteChat, data, {
      method: 'Post',
    });
    if (res.code === 200) {
      this.deleteInfo = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async EditUserStatus({ data, callback }: ReqData) {
    const res = await request<UserStatus>(urlMaps.EditUserStatus, data, {
      method: 'Post',
    });
    if (res.code === 200) {
      this.userStatus = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
}

export default Chat;
