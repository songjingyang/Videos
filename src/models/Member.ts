import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface MemberPage {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export interface CreateMember {

}
export class Member {
  @observable
 memberPage: MemberPage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };
  @observable
  createMember: CreateMember = {
    
  };
  @action
  async getMemberPage({ data, callback }: ReqData) {
    const res = await request<MemberPage>(urlMaps.getMemberPage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.memberPage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteMember({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteMember, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.deleteInfo = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async CreateMember({ data, callback }: ReqData) {
    const res = await request<CreateMember>(urlMaps.CreateMember, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.createMember = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
}

export default Member;
