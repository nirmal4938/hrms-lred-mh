import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai';

interface MenuItem {
  title: string;
  submenu: string[];
}

interface SubMenuProps {
  listData: MenuItem[];
  activeSubMenu: string;
  setActiveSubMenu: (menu: string) => void;
}

const SubMenu: React.FC<SubMenuProps> = ({
  listData,
  activeSubMenu,
  setActiveSubMenu,
}) => {
  const handleMenuClick = (menu: string) => {
    setActiveSubMenu(menu === activeSubMenu ? '' : menu);
  };

  const renderSubmenu = (submenus: string[]) => {
    return (
      <ul className="ml-4">
        {submenus.map((subitem, subindex) => (
          <li key={subindex}>
            <NavLink
              to={`/${subitem.toLowerCase().replace(/\s+/g, '')}`}
              className={({ isActive }) => (isActive ? 'font-bold text-red-400 hover:text-red-500' : '')}
            >
              <div className="py-3 px-8 text-sm flex items-center">
                <span className="mr-2">&bull;</span> {subitem}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  const renderMenu = (menuItems: MenuItem[]) => {
    return (
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              className="py-3 px-4 text-sm flex items-center justify-between cursor-pointer"
              onClick={() => handleMenuClick(item.title)}
            >
              {item.title !== "Blogs" && item.title !== "FAQs" ? (
                <NavLink
                  to={`/${item.title.toLowerCase().replace(/\s+/g, '')}`}
                  className={({ isActive }) => (isActive ? 'font-bold text-red-400 hover:text-red-500' : '')}
                >
                  <span className="flex items-center">
                    <span className="mr-2">&bull;</span> {item.title}
                  </span>
                </NavLink>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">&bull;</span> {item.title}
                </span>
              )}
              {item.submenu.length > 0 && (
                <span>
                  {activeSubMenu === item.title ? <AiOutlineDown /> : <AiOutlineRight />}
                </span>
              )}
            </div>
            {item.submenu.length > 0 && activeSubMenu === item.title && renderSubmenu(item.submenu)}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderMenu(listData)}</div>;
};

export default SubMenu;
