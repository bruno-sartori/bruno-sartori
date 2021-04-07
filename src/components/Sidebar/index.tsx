import React from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';

// Components
import SidebarItem, { ISidebarItemProps } from '@components/SidebarItem';

// Images
import Logo from '@images/logo.png';

// Styles
import './index.scss';

declare interface ISidebarProps extends WithRouterProps {
  menuItems: Array<ISidebarItemProps>;
}

const Sidebar = (props: ISidebarProps) => {
  const { menuItems = [] } = props;

  return (
    <section className="sidebar">
      <div className="sidebar__logo">
        <figure>
          <img src={Logo} width={70} height={70} />
        </figure>
      </div>
      <ul className="sidebar__list">
        {menuItems.map(item => <SidebarItem {...item} />)}
      </ul>
    </section>
  );
};

export default withRouter(Sidebar);
