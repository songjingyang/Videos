import Login from '../modules/User/Login';
import MessageList from '../modules/MessageManage/MessageList'
import CommentList  from '../modules/CommentManage/CommentList'
import ChatList from '../modules/ChatManage/ChatRecord'
const routerData: any[] = [
  {
    path: '/user/login',
    component: Login,
    meta: {
      title: '登录',
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
