const urlMaps: { [key: string]: string } = {
  login: '/api/admin/login',
  logout: '/api/admin/logout',
  upload: '/api/common/upload',
  getHotWordPage:"/api/heat_word",
  CreateHotWord :"/api/heat_word",
  getMitoCategory:"/api/img_cate",
  getMenuPage: "/api",//网站概览
  getWebSitePage: "/api",//网站统计
  getOnlinePage: "/api",//在线统计
  getVisitPage: "/api/stat/view",//"访问统计"
  DeleteVisit: "/api",
  getSystemPage: "/api",//基础设置
  saveSystemSetting: "/api",//保存设置
  getAccountPage: "/api",
  getNavPage:"/api/nav",//navpage
  CreateNav :"/api/nav",
  getCategoryPage:"/api/cate", // 分类编辑
  CreateCategory:"/api",
  DeleteCategory:"/api",
  getMitoPage :"/api/img",
  DeleteMito:"/api/img",//删除图片
  CreateMito:"/api/img_cate",
  getTagPage :"/api/tag",
  DeleteTag:"/api",
  CreateTag :"/api/tag",

  getVideoPage :"/api",
  DeleteVideo:"/api",
  CreateVideo :"/api",
  getDefaultAdvert:"/api/ad/1",
  getExtensionPage: "/api/spread",//推广管理
  DeleteInfo: "/api",//推广删除
  getExtensionRecord: "/api/spread_log",//推广记录
  DeleteExtensionRecord: "/api",//推广记录删除
  CreateAdmin: "/api",
  getAdvertSpacePage: "/api/ad_cate",//广告位列表
  EditAdvertSpace: "/api/ad_cate",//添加编辑广告位
  DeleteAdvertSpace: "/api",//删除广告位

  getAdvertPage: "/api/ad",//广告列表
  EditAdvert: "/api/ad",//添加编辑广告
  DeleteAdvert: "/api",//删除广告
  AdvertAudit:"/api/ad/1/audit",//广告审核
  getMemberPage: "/api/user",//会员列表
  CreateMember: "/api/user",//添加编辑会员
  DeleteMember: "/api",//删除会员
  getAuditPage: "/api",//提现审核
  getOrderPage: "/api",//订单列表
  getMessagePage: "/api/question",//留言列表
  DeleteRecord: "/api", //删除留言
  getCommentList: "/api/comment",//评论
  DeleteComment: "/api",
  getChatList: "/api/msg",
  DeleteChat: "/api",
  EditUserStatus: "/api"
};

// export const baseUrl = 'http://share.axingxing.com/proxy'
export const baseUrl = '';
export default urlMaps;
