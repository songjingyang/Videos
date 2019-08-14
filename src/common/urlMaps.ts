const urlMaps: { [key: string]: string } = {
  login: '/api/admin/login',
  logout: '/api/admin/logout',
  upload: '/api/common/upload',

  getMenuPage: "/api",//网站概览
  getWebSitePage: "/api",//网站统计
  getOnlinePage: "/api",//在线统计
  getVisitPage: "/api",//"访问统计"
  DeleteVisit: "/api",
  getSystemPage: "/api",//基础设置
  saveSystemSetting: "/api",//保存设置
  getAccountPage: "/api",

  getExtensionPage: "/api",//推广管理
  DeleteInfo: "/api",//推广删除
  getExtensionRecord: "/api",//推广记录
  DeleteExtensionRecord: "/api",//推广记录删除
  CreateAdmin: "/api",

  getMemberPage: "/api",//会员列表
  EditMember: "/api",//添加编辑会员
  DeleteMember: "/api",//删除会员
  getAuditPage: "/api",//提现审核
  getOrderPage: "/api",//订单列表
  getMessagePage: "/api",//留言列表
  DeleteRecord: "/api", //删除留言
  getCommentPage: "/api",
  DeleteComment: "/api",
  getChatPage: "/api",
  DeleteChat: "/api",
  EditUserStatus: "/api"
};

// export const baseUrl = 'http://share.axingxing.com/proxy'
export const baseUrl = '';
export default urlMaps;
