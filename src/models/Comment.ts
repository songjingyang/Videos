import { observable, action } from 'mobx';
import request, { urlMaps, ResData, ReqData } from '../common/request';
import { string } from 'prop-types';
export interface CommentList {
  ts : string ;
  total : number ;
   list :[]
}
export interface DeleteInfo {

}
export class Comment {
  @observable
  commentList: CommentList = {
    ts :"",
    total :0,
    list :[]
  };
  @observable
  deleteInfo: DeleteInfo = {
    
  };
  @action
  async getCommentList({ data, callback }: ReqData) {
    const res = await request<CommentList>(urlMaps.getCommentList, data, {
      method: 'GET',
    });
    if (res.code === 200) {
      this.commentList = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
  @action
  async DeleteRecord({ data, callback }: ReqData) {
    const res = await request<DeleteInfo>(urlMaps.DeleteComment, data, {
      method: 'Post',
    });
    if (res.code === 200) {
      this.deleteInfo = res.data;
    
    }
    if (callback) {
      callback(res);
    }
  }
}

export default Comment;
