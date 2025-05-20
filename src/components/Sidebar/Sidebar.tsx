import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TbLogs } from "react-icons/tb";
import {
  AiOutlineDown,

  AiOutlineUser,
  AiOutlineRight,
} from "react-icons/ai";
import SubMenu from "./SubMenu";

interface Props {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<Props> = ({ showSidebar }) => {
  const [activeMenu, setActiveMenu] = useState<string>("bloglist");
  const [isSubMenuUserOpen, setIsSubMenuUserOpen] = useState(false);
  const [isSubMenuContentOpen, setIsSubMenuContentOpen] = useState(false);
  const [isSubMenuSettingsOpen, setIsSubMenuSettingsOpen] = useState(false);
  const [isSubMenuMasterOpen, setIsSubMenuMasterOpen] = useState(false);

  const [activeSubMenu, setActiveSubMenu] = useState("");



  const handleMenuClick = (menu: string) => {
    if (menu !== activeMenu) {
      setActiveMenu(menu);
    }
  
    // Create URL-friendly version of the menu name
    const urlPath = menu.toLowerCase().replace(/\s+/g, '-');
    window.history.pushState({}, '', `/${urlPath}`);

    setIsSubMenuUserOpen(menu === "user" ? !isSubMenuUserOpen : false);
    setIsSubMenuContentOpen(menu === "content" ? !isSubMenuContentOpen : false);
    setIsSubMenuSettingsOpen(menu === "settings" ? !isSubMenuSettingsOpen : false);
    setIsSubMenuMasterOpen(menu === "master" ? !isSubMenuMasterOpen : false);
  };
  
  
  const customNavLink = (to: string, menu: string, label: string, Icon: React.ElementType) => (
    <NavLink to={to} onClick={() => handleMenuClick(menu)}>
      {({ isActive }) => (
        <li
          className={`py-2 flex items-center justify-between cursor-pointer hover:text-red-500 ${
            isActive ? "font-bold text-red-500 bg-gray-800" : "text-[#EFF6FF]"
          }`}
        >
          <span className="flex items-center">
            <Icon className="mx-2" />
            <span className={`${showSidebar ? "inline" : "hidden"}`}>{label}</span>
          </span>
        </li>
      )}
    </NavLink>
  );
  

  return (
    <div
      className={`fixed top-0 left-0 h-full ${
        showSidebar ? "" : ""
      } ${showSidebar ? "w-64" : "w-12"} bg-gray-900 text-[#EFF6FF] z-50 transition-all duration-300 ease-in-out transform ${
        showSidebar ? "translate-x-0 shadow-lg" : "translate-x-0 shadow-lg"
      }`}
    >
      <div className="p-2 flex flex-col h-full">
        <>
        <div className="flex items-center justify-center mt-4 " > 
        {showSidebar && <img src='https://www.lred.com/wp-content/uploads/2020/05/lred-main-logo-1823x654-1.png' alt="Logo" height={150} width={180} />}
        </div>

          <ul className="mt-6 flex-1">
            <li
              className={`py-2 flex items-center justify-between cursor-pointer hover:text-red-500 ${
                activeMenu === "user" ? "font-bold text-red-500 bg-gray-800" : "text-[#EFF6FF]"
              }`}
              onClick={() => handleMenuClick("user")}
            >
              <span className="flex items-center">
                <AiOutlineUser className="mx-2" />
                <span className={`${showSidebar ? "inline" : "hidden"}`}>Users</span>
              </span>
              {showSidebar &&
                (isSubMenuUserOpen ? (
                  <AiOutlineDown className="w-4 h-4" />
                ) : (
                  <AiOutlineRight className="w-4 h-4" />
                ))}
            </li>
            {isSubMenuUserOpen && showSidebar && (
              <SubMenu
                listData={[
                  { title: "Users list", submenu: [] },
                ]}
                activeSubMenu={activeSubMenu}
                setActiveSubMenu={setActiveSubMenu}
              />
            )}
            
        
            {/* {customNavLink("/email-template", "email-template", "Email Templates", AiOutlineMail)} */}
           
            
            <li
              className={`py-2 flex items-center justify-between cursor-pointer hover:text-red-500 ${
                activeMenu === "content" ? "font-bold text-red-500 bg-gray-800" : "text-[#EFF6FF]"
              }`}
              onClick={() => handleMenuClick("content")}
            >
              <span className="flex items-center">
                <TbLogs className="mx-2" />
                <span className={`${showSidebar ? "inline" : "hidden"}`}>Content</span>
              </span>
              {showSidebar &&
                (isSubMenuContentOpen ? (
                  <AiOutlineDown className="w-4 h-4" />
                ) : (
                  <AiOutlineRight className="w-4 h-4" />
                ))}
            </li>
            {isSubMenuContentOpen && showSidebar && (
              <SubMenu
                listData={[
                  { title: "Jobs", submenu: ["Job List", "Job Post"] },
                  { title: "Blogs", submenu: ["Blog List", "Blog Category"] },
                  // { title: "FAQs", submenu: ["FAQ list", "FAQ Category"]},
                  { title: "UI Management ", submenu: ["Hero Section","Testimonial","why choose us","Statistics","News and events"] },
                  { title: "Service management", submenu: ["service category","Services"] },

                ]}
                activeSubMenu={activeSubMenu}
                setActiveSubMenu={setActiveSubMenu}
              />
            )}

            {/* {customNavLink("/role", "role", "Role", AiOutlineCheckCircle)} */}
            {/* <li
              className={`py-2 flex items-center justify-between cursor-pointer hover:text-[#EFF6FF] ${
                activeMenu === "master" ? "font-bold text-[#EFF6FF] bg-red-900" : ""
              }`}
              onClick={() => handleMenuClick("master")}
            >
              <span className="flex items-center">
                <AiOutlineCrown className="mx-2" />
                <span className={`${showSidebar ? "inline" : "hidden"}`}>Master</span>
              </span>
              {showSidebar &&
                (isSubMenuMasterOpen ? (
                  <AiOutlineDown className="w-4 h-4" />
                ) : (
                  <AiOutlineRight className="w-4 h-4" />
                ))}
            </li> */}
            {/* {isSubMenuMasterOpen && showSidebar && (
              <SubMenu
                listData={[
                  { title: "Language", submenu: [] },
                  { title: "Country", submenu: [] },
                ]}
                activeSubMenu={activeSubMenu}
                setActiveSubMenu={setActiveSubMenu}
              />
            )} */}
            {/* {customNavLink("/support", "support", "Support", AiOutlineMessage)} */}
  
          </ul>
       
        </>
      </div>
    </div>
  );
};

export default Sidebar;

interface MenuItem {
  title: string;
  submenu: string[];
}

interface NestedMenuProps {
  isSubMenuOpen: boolean;
  listData: MenuItem[];
  activeSubMenu: string;
  setActiveSubMenu: (menu: string) => void;
}

export const NestedMenuList: React.FC<NestedMenuProps> = ({
  listData,
  isSubMenuOpen,
  activeSubMenu,
  setActiveSubMenu,
}) => {
  if (isSubMenuOpen) {
    return <SubMenu listData={listData} activeSubMenu={activeSubMenu} setActiveSubMenu={setActiveSubMenu} />;
  } else {
    return null;
  }
};
