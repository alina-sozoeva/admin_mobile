import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Space } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useMemo } from "react";

import { pageName, pathName } from "../../enums";
import { PiPillThin, PiUserCirclePlusThin, PiUsersThin } from "react-icons/pi";
import { CiMedicalCross } from "react-icons/ci";
import { GiStethoscope } from "react-icons/gi";

import styles from "./CustomSidebar.module.scss";
import clsx from "clsx";

const menuKeys = [
  {
    key: "1",
    label: pageName.medications,
    path: pathName.medications,
    icon: <PiPillThin />,
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
    icon: <GiStethoscope />,
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
    icon: <PiUserCirclePlusThin />,
  },
  {
    key: "5",
    label: pageName.patients,
    path: pathName.patients,
    icon: <PiUsersThin />,
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
