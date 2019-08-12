import React from 'react'
import { Menu, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'
import { getMenuData } from '../../common/menu'
import './index.less'
const SubMenu = Menu.SubMenu
const menuData = getMenuData()
const { Sider } = Layout
interface Props {
  collapsed: boolean;
}
interface State {
}
class GlobalSider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }
  componentWillReceiveProps(nextProps: Props) {
    // const { location } = this.props;
    // if (nextProps.location.pathname !== location.pathname) {
    //   this.setState({
    //     openKeys: this.getDefaultCollapsedSubMenus(nextProps)
    //   });
    // }
  }
  // handleClick=(e:any)=>{
  //   console.log('e :', e);
  // }

  render() {
    const collapsed = this.props.collapsed;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        className="sider"
      >
        <div styleName="logo">
          <Icon type="wallet" className="logo-img" />
          {!collapsed && <h1>后台管理系统</h1>}
        </div>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[
            window.location.pathname ? window.location.pathname : '/menu/home',
          ]}
          defaultOpenKeys={[
            '/menu',
          ]}
          inlineCollapsed={collapsed}
        // onClick={this.handleClick}
        >
          {menuData.map(item => {
            if (item.children) {
              return (
                <SubMenu
                  key={item.path}
                  title={
                    <span>
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </span>
                  }
                >
                  {item.children.map((subItem: any) =>
                    (
                      <Menu.Item key={subItem.path}>
                        <Link to={subItem.path}>
                          {/* <Icon type={item.icon} /> */}
                          <span>{subItem.name}</span>
                        </Link>
                      </Menu.Item>
                    )

                  )}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.path}>
                  <span>
                    <Link styleName="nav-link" to={item.path}>
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </Link>
                  </span>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
    );
  }
}
export default GlobalSider
