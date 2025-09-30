import { useState } from "react";
import { Flex, Input, Select, Tooltip, Tree } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import styles from "./DoctorsPage.module.scss";
import clsx from "clsx";
import { WarningModal } from "../../common";

export const DoctorsPage = () => {
  const clinics = [
    { key: "0", title: "Клиника 1" },
    { key: "1", title: "Клиника 2" },
    { key: "2", title: "Клиника 3" },
  ];

  const allDoctors = [
    {
      id: 1,
      name: "test1",
      clinicKey: "0",
      phone: "(996) 555 55 55 55",
      email: "test1@gmail.com",
      login: "test",
      password: 123,
    },
    {
      id: 2,
      name: "test2",
      clinicKey: "0",
      phone: "(996) 555 11 11 11",
      email: "test2@gmail.com",
      login: "test",
      password: 123,
    },
    {
      id: 3,
      name: "test3",
      clinicKey: "1",
      phone: "(996) 555 00 00 00",
      email: "test3@gmail.com",
      login: "test",
      password: 123,
    },
    {
      id: 4,
      name: "test4",
      clinicKey: "2",
      phone: "(996) 555 22 22 22",
      email: "test4@gmail.com",
      login: "test",
      password: 123,
    },
  ];

  const [selectedClinic, setSelectedClinic] = useState("0");
  const [open, setOpen] = useState(false);

  const treeData = clinics.map((c) => ({ title: c.title, key: c.key }));

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedClinic(selectedKeys[0]);
    }
  };

  const dataSource = allDoctors.filter((d) => d.clinicKey === selectedClinic);

  return (
    <main className={styles.main}>
      <div className={styles.arr}>
        <Flex gap={"small"} align="center">
          <h3 className={clsx("font-bold")}>Клиники</h3>

          <Tooltip title={"Добавить клинику"}>
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
      <WarningModal
        title={"врача"}
        open={open}
        onCancel={() => setOpen(false)}
      />
    </main>
  );
};
