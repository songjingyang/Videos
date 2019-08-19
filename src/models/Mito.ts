import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface MitoPage {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export interface CreateMito {

}
export class Mito {
  @observable
 mitoPage: MitoPage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };
  @observable
  createMito: CreateMito = {
    
  };
  @action
  async getMitoPage({ data, callback }: ReqData) {
    const res = await request<MitoPage>(urlMaps.getMitoPage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.mitoPage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteMito({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteMito+"/"+data.id, data, {
      method: 'DELETE',
    });
    if (res.code === 200) {
      this.deleteInfo = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async CreateMito({ data, callback }: ReqData) {
    const res = await request<CreateMito>(urlMaps.CreateMito, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.createMito = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
}

export default Mito;
