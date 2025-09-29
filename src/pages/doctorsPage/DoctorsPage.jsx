import { Flex, Input, Select, Tooltip } from "antd";
import { CloseOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import styles from "./DoctorsPage.module.scss";
import clsx from "clsx";

export const DoctorsPage = () => {
  const dataSource = [
    {
      nameid: "test1",
      phone: "(996) 555 55 55 55",
      email: "test2@gmail.com",
      login: "test",
      password: 123,
    },
    {
      nameid: "test2",
      phone: "(996) 555 00 00 00",
      email: "test2@gmail.com",
      login: "test",
      password: 123,
    },
  ];
  return (
    <main>
      <table className={clsx(styles.recipeTable)} border={true}>
        <thead>
          <tr>
            <th style={{ width: "3%", textAlign: "center" }}>
              <Tooltip title={"Добавить"}>
                <PlusOutlined className={clsx("text-blue text-center")} />
              </Tooltip>
            </th>
            <th style={{ width: "16%" }}>ФИО</th>
            <th style={{ width: "16%" }}>Клиника</th>
            <th style={{ width: "16%" }}>Телефон</th>
            <th style={{ width: "16%" }}>Email</th>
            <th style={{ width: "16%" }}>Логин</th>
            <th style={{ width: "16%" }}>Пароль</th>
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
                  defaultValue="test1"
                  className={clsx("w-full")}
                  options={[
                    { value: "test1", label: "test1" },
                    { value: "test2", label: "test2" },
                    { value: "test3", label: "test3" },
                    { value: "test4", label: "test4" },
                  ]}
                />{" "}
              </td>
              <td>
                <Input value={item.phone} className={clsx("w-full")} />
              </td>
              <td>
                <Input value={item.email} className={clsx("w-full")} />
              </td>

              <td>
                <Input value={item.login} className={clsx("w-full")} />
              </td>
              <td>
                <Input value={item.password} className={clsx("w-full")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
