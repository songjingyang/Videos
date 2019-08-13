import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface MenuPage {
  ts : string ;
  total : number ;
   list :[]
}
export interface WebSitePage {
  ts : string ;
  total : number ;
   list :[]
}
export interface OnlinePage {
  ts : string ;
  total : number ;
   list :[]
}
export interface VisitPage {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export class Menu {
  @observable
  menuPage: MenuPage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  webSitePage: WebSitePage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  onlinePage: OnlinePage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  visitPage: VisitPage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };
  @action
  async getMenuPage({ data, callback }: ReqData) {
    const res = await request<MenuPage>(urlMaps.getMenuPage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.menuPage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }

  @action
  async getWebSitePage({ data, callback }: ReqData) {
    const res = await request<WebSitePage>(urlMaps.getWebSitePage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.webSitePage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async getOnlinePage({ data, callback }: ReqData) {
    const res = await request<OnlinePage>(urlMaps.getOnlinePage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.onlinePage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }

  @action
  async getVisitPage({ data, callback }: ReqData) {
    const res = await request<VisitPage>(urlMaps.getVisitPage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.visitPage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }

  @action
  async DeleteVisit({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteVisit, data, {
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

export default Menu;
