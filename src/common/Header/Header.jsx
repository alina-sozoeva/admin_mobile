import { Dropdown, Flex, Input, Space } from "antd";

import styles from "./Header.module.scss";
import clsx from "clsx";
import {
  CaretDownOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { pageName, pathName } from "../../enums";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: (
        <Space>
          <UserOutlined className={clsx("text-blue")} /> Admin
        </Space>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <Space onClick={() => navigate("/login")}>
          <LogoutOutlined rotate={270} className={clsx("text-red")} /> Выйти
        </Space>
      ),
      key: "3",
    },
  ];

  const title = (() => {
    switch (location.pathname) {
      case pathName.medications:
        return pageName.medications;
      case pathName.users:
        return pageName.users;
      case pathName.clinics:
        return pageName.clinics;
      case pathName.patients:
        return pageName.patients;
      case pathName.pharmacies:
        return pageName.pharmacies;
      case pathName.doctors:
        return pageName.doctors;
      default:
        return pageName.notFound;
    }
  })();

  return (
    <header className={clsx(styles.header, "antd-d")}>
      <Flex vertical className={clsx("gap-[5px]")}>
        <h2 className={clsx("font-bold")}>{title}</h2>
        <Input placeholder="Поиск" prefix={<SearchOutlined />} />
      </Flex>

      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        getPopupContainer={(triggerNode) => triggerNode}
      >
        <div onClick={(e) => e.preventDefault()}>
          <Space>
            <Flex vertical gap={4}>
              <p className={clsx(styles.user_info, "font-bold")}>Admin</p>
            </Flex>
            <CaretDownOutlined />
          </Space>
        </div>
      </Dropdown>
    </header>
  );
};
