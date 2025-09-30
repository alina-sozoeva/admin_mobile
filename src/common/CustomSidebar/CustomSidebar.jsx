import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Space } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { LiaPillsSolid } from "react-icons/lia";

import { pageName, pathName } from "../../enums";
import { PiUserCirclePlus } from "react-icons/pi";
import { CiMedicalCross } from "react-icons/ci";
import { FaRegHospital } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import styles from "./CustomSidebar.module.scss";
import clsx from "clsx";

const menuKeys = [
  {
    key: "1",
    label: pageName.medications,
    path: pathName.medications,
    icon: <LiaPillsSolid />,
  },

  {
    key: "3",
    label: pageName.pharmacies,
    path: pathName.pharmacies,
    icon: <CiMedicalCross />,
  },
  {
    key: "6",
    label: pageName.doctors,
    path: pathName.doctors,
    icon: <FaUserDoctor />,
  },
  // {
  //   key: "4",
  //   label: pageName.clinics,
  //   path: pathName.clinics,
  //   icon: <FaRegHospital />,
  // },

  {
    key: "2",
    label: pageName.users,
    path: pathName.users,
    icon: <PiUserCirclePlus />,
  },
  {
    key: "5",
    label: pageName.patients,
    path: pathName.patients,
    icon: <UsergroupAddOutlined />,
  },
];

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = useMemo(() => {
    const currentMenuItem = menuKeys.find(
      (item) => item.path === location.pathname
    );
    return currentMenuItem ? currentMenuItem.key : null;
  }, [location.pathname]);

  const handleMenuClick = () => {
    localStorage.removeItem("filteredStatus");
  };

  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.nav}>
        <Space direction={"horizontal"} className={styles.logo} size={56}>
          <Link to="/">LOGO</Link>
        </Space>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={menuKeys.map(({ key, label, path, icon }) => ({
            key,
            label: (
              <Link
                to={path}
                onClick={() => handleMenuClick()}
                className={clsx(styles.link, "flex items-center gap-[10px]")}
              >
                {icon} {label}
              </Link>
            ),
          }))}
          className={styles.menu}
        />
      </div>
    </div>
  );
};
