import { Flex, Input, Tooltip } from "antd";
import { CloseOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import styles from "./PharmaciesPage.module.scss";
import clsx from "clsx";

export const PharmaciesPage = () => {
  const dataSource = [
    {
      nameid: "test1",
      adress: "ул. Тестоая, 12",
      phone: "(996) 555 55 55 55",
    },
    {
      nameid: "test2",
      adress: "ул. Тестоая, 45",
      phone: "(996) 555 00 00 00",
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
            <th style={{ width: "30%" }}>Наименование</th>
            <th style={{ width: "30%" }}>Адрес</th>
            <th style={{ width: "30%" }}>Телефон</th>
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
                <Input value={item.adress} className={clsx("w-full")} />
              </td>
              <td>
                <Input value={item.phone} className={clsx("w-full")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
