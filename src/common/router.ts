import Login from '../modules/User/Login';
import MessageList from '../modules/MessageManage/MessageList'
import CommentList  from '../modules/CommentManage/CommentList'
import ChatList from '../modules/ChatManage/ChatRecord'
import WebsiteOverview from '../modules/ManageMenu/WebsiteOverview';
import WebsiteStatistics from '../modules/ManageMenu/WebsiteStatistics';
import OnlineStatistics from '../modules/ManageMenu/OnlineStatistics';
import VisitStatistics from '../modules/ManageMenu/VisitStatistics';
import BasicSettings from '../modules/System/BasicSettings';
import ManagementAccount from '../modules/System/ManagementAccount';
import OrderList from '../modules/Order/OrderList';
import AuditWithdrawal from '../modules/Order/AuditWithdrawal';
const routerData: any[] = [
  {
    path: '/user/login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/menu/home',
    component: WebsiteOverview,
    meta: {
      title: '网站概览',
    },
  },
  {
    path: '/menu/translate',
    component: WebsiteStatistics,
    meta: {
      title: '网站统计',
    },
  },
  {
    path: '/menu/visit',
    component: VisitStatistics,
    meta: {
      title: '访问统计',
    },
  },
  {
    path: '/menu/online',
    component: OnlineStatistics,
    meta: {
      title: '在线统计',
    },
  },
  {
    path: '/system/home',
    component: BasicSettings,
    meta: {
      title: '基础设置',
    },
  },


  {
    path: '/system/account',
    component: ManagementAccount,
    meta: {
      title: '管理账户',
    },
  },
  {
    path: '/order/home',
    component: OrderList,
    meta: {
      title: '订单列表',
    },
  },
  {
    path: '/order/audit',
    component: AuditWithdrawal,
    meta: {
      title: '审核提现',
    },
  },
  {
    path: '/chat/home',
    component: ChatList,
    meta: {
      title: '聊天记录',
    },
  },
  {
    path: '/comment/home',
    component: CommentList,
    meta: {
      title: '评论列表',
    },
  },
  {
    path: '/message/home',
    component: MessageList,
    meta: {
      title: '留言列表',
    },
  },
];

export function getRouterData(): any[] {
  return routerData;
}

export default getRouterData;
