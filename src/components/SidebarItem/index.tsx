import React from 'react';
import './index.scss';

export interface ISidebarItemProps {
  title: string;
  href: string;
  icon: any;
  active?: boolean;
}

const SidebarItem: React.FC<ISidebarItemProps> = (props) => {
  const { title, href, icon, active = false } = props;

  return (
    <li className={`sidebar-item  ${active ? 'sidebar-item--active' : ''}`}>
      <a href={href}>
        <div className="sidebar-item__container">
          <div className="sidebar-item__icon">
            {icon}
          </div>
          <div className="sidebar-item__title">
            {title}
          </div>
          {active && (
            <>
              <div className="top-wave">
                <div className="top-wave-border" />
              </div>
              <div className="bottom-wave">
                <div className="bottom-wave-border" />
              </div>
            </>
          )}
        </div>
      </a>
    </li>
  );
}

export default SidebarItem;
