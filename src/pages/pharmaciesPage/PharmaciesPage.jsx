import { useState } from "react";
import { Flex, Input, Tooltip, Tree } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import styles from "./PharmaciesPage.module.scss";
import clsx from "clsx";
import { WarningModal } from "../../common";

export const PharmaciesPage = () => {
  const pharmacies = [
    { key: "0", title: "Аптека 1" },
    { key: "1", title: "Аптека 2" },
    { key: "2", title: "Аптека 3" },
  ];

  const allPharmacists = [
    {
      id: 1,
      name: "Иванов Иван",
      pharmacyKey: "0",
      phone: "(996) 555 55 55 55",
      email: "ivanov@gmail.com",
      login: "ivanov",
      password: 123,
    },
    {
      id: 2,
      name: "Петров Петр",
      pharmacyKey: "0",
      phone: "(996) 555 11 11 11",
      email: "petrov@gmail.com",
      login: "petrov",
      password: 123,
    },
    {
      id: 3,
      name: "Сидоров Сидор",
      pharmacyKey: "1",
      phone: "(996) 555 22 22 22",
      email: "sidorov@gmail.com",
      login: "sidorov",
      password: 123,
    },
    {
      id: 4,
      name: "Кузнецов Кузьма",
      pharmacyKey: "2",
      phone: "(996) 555 33 33 33",
      email: "kuznetsov@gmail.com",
      login: "kuznetsov",
      password: 123,
    },
  ];

  const [selectedPharmacy, setSelectedPharmacy] = useState("0"); // по умолчанию первая аптека
  const [open, setOpen] = useState(false);

  const treeData = pharmacies.map((p) => ({ title: p.title, key: p.key }));

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedPharmacy(selectedKeys[0]);
    }
  };

  const dataSource = allPharmacists.filter(
    (p) => p.pharmacyKey === selectedPharmacy
  );

  return (
    <main className={styles.main}>
      <div className={styles.arr}>
        <Flex gap={"small"} align="center">
          <h3 className={clsx("font-bold")}>Аптеки</h3>
          <Tooltip title={"Добавить аптеку"}>
            <PlusOutlined className={clsx("text-blue text-center")} />
          </Tooltip>
        </Flex>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={["0"]}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>

      <Flex vertical className={clsx("w-full")}>
        <h3 className={clsx("font-bold")}>Фармацевты</h3>
        <table className={clsx(styles.recipeTable)} border={true}>
          <thead>
            <tr>
              <th style={{ width: "3%", textAlign: "center" }}>
                <Tooltip title={"Добавить"}>
                  <PlusOutlined className={clsx("text-blue text-center")} />
                </Tooltip>
              </th>
              <th style={{ width: "16%" }}>ФИО</th>
              <th style={{ width: "16%" }}>Телефон</th>
              <th style={{ width: "16%" }}>Email</th>
              <th style={{ width: "16%" }}>Логин</th>
              <th style={{ width: "16%" }}>Пароль</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((item) => (
              <tr key={item.id}>
                <td>
                  <Flex gap={"small"} wrap="nowrap">
                    <Tooltip title={"Удалить"}>
                      <CloseOutlined
                        className={clsx("text-red")}
                        onClick={() => setOpen(true)}
                      />
                    </Tooltip>
                    <Tooltip title={"Сохранить"}>
                      <SaveOutlined className={clsx("text-blue")} />
                    </Tooltip>
                  </Flex>
                </td>
                <td>
                  <Input value={item.name} className={clsx("w-full")} />
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
      </Flex>
      <WarningModal
        title={"фармацевта"}
        open={open}
        onCancel={() => setOpen(false)}
      />
    </main>
  );
};
