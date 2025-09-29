import { CloseOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Flex, Input, Select, Tooltip } from "antd";

import styles from "./UsersPage.module.scss";
import clsx from "clsx";

export const UsersPage = () => {
  const dataSource = [
    {
      nameid: "test1",
      email: "test1@gmail.com",
    },
    {
      nameid: "test2",
      email: "test2@gmail.com",
    },
  ];
  return (
    <main>
      <table className={clsx(styles.recipeTable)} border={true}>
        <thead>
          <tr>
            <th style={{ width: "2.5%", textAlign: "center" }}>
              <Tooltip title={"Добавить"}>
                <PlusOutlined className={clsx("text-blue text-center")} />
              </Tooltip>
            </th>
            <th style={{ width: "30%" }}>ФИО</th>
            <th style={{ width: "30%" }}>Роль</th>
            <th style={{ width: "30%" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item) => (
            <tr>
              <td>
                <Flex gap={"small"} wrap="nowrap">
                  <Tooltip title={"Удалить"}>
                    <CloseOutlined className={clsx("text-red")} />
                  </Tooltip>
                  <Tooltip title={"Сохранить"}>
                    <SaveOutlined className={clsx("text-blue")} />
                  </Tooltip>
                </Flex>
              </td>
              <td>
                <Input value={item.nameid} className={clsx("w-full")} />
              </td>
              <td>
                <Select
                  defaultValue="admin"
                  className={clsx("w-full")}
                  options={[
                    { value: "admin", label: "admin" },
                    { value: "operator", label: "operator" },
                  ]}
                />
              </td>
              <td>
                <Input value={item.email} className={clsx("w-full")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
