import { Layout } from "antd";

import { Outlet } from "react-router-dom";
import { CustomSidebar } from "../CustomSidebar";
import { Header } from "../Header";

import styles from "./MainLayout.module.scss";
import clsx from "clsx";

export const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Layout.Sider
        width={200}
        collapsible
        collapsedWidth={60}
        trigger={null}
        theme="light"
        style={{
          position: "fixed",
          top: 0,
          width: 60,
          maxWidth: 60,
          bottom: 0,
          zIndex: 401,
          overflow: "auto",
          background: "white",
        }}
      >
        <CustomSidebar />
      </Layout.Sider>

      <Layout style={{ marginLeft: 200 }} className={clsx(styles.wrap)}>
        <Header />
        <Layout.Content className={styles.content}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
