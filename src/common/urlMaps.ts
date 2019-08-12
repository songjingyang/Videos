const urlMaps: { [key: string]: string } = {
  login: '/api/admin/login', 
  logout: '/api/admin/logout',
  upload  : '/api/common/upload',

  getMessagePage : "/api",//留言列表
  DeleteRecord : "/api", //删除留言
  getCommentPage : "/api",
  DeleteComment : "/api", 
  getChatPage : "/api",
  DeleteChat : "/api", 
  EditUserStatus : "/api"
};
  
// export const baseUrl = 'http://share.axingxing.com/proxy'
export const baseUrl = '';
export default urlMaps;
