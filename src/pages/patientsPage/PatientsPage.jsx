import { Flex, Input, Select, Tooltip } from "antd";
import { CloseOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import styles from "./PatientsPage.module.scss";
import clsx from "clsx";

export const PatientsPage = () => {
  const dataSource = [
    {
      nameid: "test1",
      phone: "(996) 555 55 55 55",
      email: "test2@gmail.com",
      gender: "жен",
      bith: "09.09.2000",
    },
    {
      nameid: "test2",
      phone: "(996) 555 00 00 00",
      email: "test2@gmail.com",
      gender: "жен",
      bith: "09.09.2000",
    },
  ];
  return (
    <main>
      <table className={clsx(styles.recipeTable)} border={true}>
        <thead>
          <tr>
            <th style={{ width: "3%", textAlign: "center" }}>№</th>
            <th style={{ width: "20%" }}>ФИО</th>
            <th style={{ width: "20%" }}>Дата рождения</th>
            <th style={{ width: "20%" }}>Телефон</th>
            <th style={{ width: "20%" }}>Email</th>
            <th style={{ width: "20%" }}>Пол</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.nameid}</td>
              <td>{item.bith}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
