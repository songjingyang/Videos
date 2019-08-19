import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface AdvertPage {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export interface DefaultAdvert {
  cover_url: string
  created_at: string
  desc: any
  duration: any
  end_at: string
  id: number
  path: any
  pos: number
  start_at:string
  status: number
  title: string
  type: number
  updated_at: string
  url: string
}
export interface CreateAdvert {

}


export interface AdvertSpacePage {
    ts : string ;
    total : number ;
     list :[]
  }
  export interface DeleteSpaceInfo {
  
  }
  export interface CreateAdvertSpace {
  
  }
export class Advert {

    @observable
    advertPage: AdvertPage = {
      ts :"",
      total :0,
      list :[]
    };
    @observable
    deleteInfo: DeleteInfo = {
      
    };
    @observable
    createAdvert: CreateAdvert = {
      
    };
    @observable
    defaultAdvert: DefaultAdvert = {
      cover_url: "",
      created_at: "",
      desc: null,
      duration: null,
      end_at: "",
      id: 0,
      path: null,
      pos: 0,
      start_at:"",
      status: 0,
      title: "",
      type: 0,
      updated_at: "",
      url: "",
    };

  @observable
  advertSpacePage: AdvertSpacePage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteSpaceInfo: DeleteSpaceInfo = {
    
  };
  @observable
  createAdvertSpace: CreateAdvertSpace = {
    
  };
  @action
  async getAdvertPage({ data, callback }: ReqData) {
    const res = await request<AdvertPage>(urlMaps.getAdvertPage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.advertPage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteAdvert({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteAdvert, data, {
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
  async CreateAdvert({ data, callback }: ReqData) {
    const res = await request<CreateAdvert>(urlMaps.EditAdvert, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.createAdvert = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }


  @action
  async getAdvertSpacePage({ data, callback }: ReqData) {
    const res = await request<AdvertSpacePage>(urlMaps.getAdvertSpacePage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.advertSpacePage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteAdvertSpace({ data, callback }: ReqData) {
    const res = await request<DeleteSpaceInfo>(urlMaps.DeleteAdvertSpace, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.deleteSpaceInfo = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async CreateAdvertSpace({ data, callback }: ReqData) {
    const res = await request<CreateAdvertSpace>(urlMaps.EditAdvertSpace, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.createAdvertSpace = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async getDefaultAdvert({ data, callback }: ReqData) {
    const res = await request<DefaultAdvert>(urlMaps.getDefaultAdvert, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.defaultAdvert = res.data
    }
    if (callback) {
      callback(res.data);
    }
  }
}

export default Advert;
