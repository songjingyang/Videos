const urlMaps: { [key: string]: string } = {
  login: '/api/admin/login', 
  logout: '/api/admin/logout',
  upload  : '/api/common/upload',

  getMenuPage :"/api",//网站概览
  getWebSitePage:"/api",//网站统计
  getOnlinePage :"/api",//在线统计
  getVisitPage :"/api",//"访问统计"
  DeleteVisit:"/api",
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
