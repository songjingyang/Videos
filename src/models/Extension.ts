import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface ExtensionPage {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}

export interface ExtensionRecord {
    ts : string ;
    total : number ;
     list :[]
  }
  export interface DeleteRecord {
  
  }
export class Extension {
  @observable
  extensionPage: ExtensionPage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };

  @observable
  extensionRecord: ExtensionRecord = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteRecord: DeleteRecord = {
    
  };
  @action
  async getExtensionPage({ data, callback }: ReqData) {
    const res = await request<ExtensionPage>(urlMaps.getExtensionPage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.extensionPage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteInfo({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteInfo, data, {
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
  async getExtensionRecord({ data, callback }: ReqData) {
    const res = await request<ExtensionRecord>(urlMaps.getExtensionRecord, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.extensionRecord = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteRecord({ data, callback }: ReqData) {
    const res = await request<DeleteRecord>(urlMaps.DeleteExtensionRecord, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.deleteRecord = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
}

export default Extension;
