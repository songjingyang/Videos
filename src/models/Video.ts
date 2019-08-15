import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface VideoPage {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export interface CreateVideo {

}
export class Video {
  @observable
 videoPage: VideoPage = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };
  @observable
  createVideo: CreateVideo = {
    
  };
  @action
  async getVideoPage({ data, callback }: ReqData) {
    const res = await request<VideoPage>(urlMaps.getVideoPage, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.videoPage = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteVideo({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteVideo, data, {
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
  async CreateVideo({ data, callback }: ReqData) {
    const res = await request<CreateVideo>(urlMaps.CreateVideo, data, {
      method: 'POST',
    });
    if (res.code === 200) {
      this.createVideo = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
}

export default Video;
