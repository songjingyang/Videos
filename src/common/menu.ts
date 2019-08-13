import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: "管理菜单",
    icon: "home",
    path: "/menu",
    children: [
      {
        name: '网站概览',
        path: 'home',
      },
      {
        name: '网站统计',
        path: 'translate',
      },
      {
        name: '在线统计',
        path: 'online',
      },
      {
        name: '访问统计',
        path: 'visit',
      }
    ]
  },
  {
    name: "系统配置",
    icon: "setting",
    path: "/system",
    children: [
      {
        name: '基础设置',
        path: 'home',
      },
      {
        name: '会员设置',
        path: 'vip',
      },
      {
        name: '管理账户',
        path: 'account',
      },
      {
        name: '导航设置',
        path: 'nav ',
      },
      {
        name: '支付设置',
        path: 'pay ',
      },
      {
        name: '分类编辑',
        path: 'classification',
      },
      {
        name: '美图分类',
        path: 'Mito ',
      },
      {
        name: '标签编辑',
        path: 'tag ',
      },
      {
        name: '热词编辑',
        path: 'HotWords ',
      },
      {
        name: '虚拟形象',
        path: 'VirtualImage',
      },
      {
        name: '幻灯设置',
        path: 'SlideProjector ',
      },
    ]
  },
  {
    name: "订单管理",
    icon: "ordered-list",
    path: "/order",
    children: [
      {
        name: '订单列表',
        path: 'home',
      },
      {
        name: '审核提现',
        path: 'audit',
      },
    ]
  },
  {
    name: "会员管理",
    icon: "user",
    path: "/vip",
    children: [
      {
        name: '会员列表',
        path: 'home',
      },
    ]
  },
  {
    name: "媒体管理",
    icon: "video-camera",
    path: "/video",
    children: [
      {
        name: '视频管理',
        path: 'home',
      },
      {
        name: '秀场管理',
        path: 'show',
      },
    ]
  },
  {
    name: "美图管理",
    icon: "picture",
    path: "/picture",
    children: [
      {
        name: '图库列表',
        path: 'home',
      },
    ]
  },
  {
    name: "数据采集",
    icon: "database",
    path: "/database",
    children: [
      {
        name: '直播采集',
        path: 'home',
      },
    ]
  },
  {
    name: "广告管理",
    icon: "notification",
    path: "/advertisement",
    children: [
      {
        name: '广告位管理',
        path: 'home',
      },
      {
        name: '广告列表',
        path: 'list',
      },
    ]
  },
  {
    name: "代理管理",
    icon: "apartment",
    path: "/agent",
    children: [
      {
        name: '代理成员',
        path: 'home',
      },
      {
        name: '财务记录',
        path: 'finance',
      },
      {
        name: '分成记录',
        path: 'divide ',
      },
    ]
  },
  {
    name: "推广管理",
    icon: "share-alt",
    path: "/extension",
    children: [
      {
        name: '推广管理',
        path: 'home',
      },
      {
        name: '推广记录',
        path: 'record',
      },
    ]
  },
  {
    name: "聊天管理",
    icon: "message",
    path: "/chat",
    children: [
      {
        name: '聊天记录',
        path: 'home',
      },
    ]
  },
  {
    name: "评论管理",
    icon: "reddit",
    path: "/comment",
    children: [
      {
        name: '评论列表',
        path: 'home',
      },
    ]
  },
  {
    name: "留言管理",
    icon: "customer-service",
    path: "/message",
    children: [
      {
        name: '留言列表',
        path: 'home',
      },
    ]
  },
];

function formatter(data: any[], parentPath: string) {
  return data.map(item => {
    let path: string = item.path;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || false,
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`
        // item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData, '');
