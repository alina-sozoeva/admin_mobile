import { useState } from "react";
import { Flex, Input, Tooltip, Tree } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { WarningModal } from "../../common";
import { AddPharModal, EditPharModal } from "../../components";

import styles from "./PharmaciesPage.module.scss";
import clsx from "clsx";
import { useGetPharmacistsQuery, useGetPharmacyQuery } from "../../store";

export const PharmaciesPage = () => {
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

  const [selectedPharmacy, setSelectedPharmacy] = useState("0");
  const [openWar, setOpenWar] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState();

  const { data: pharmacies } = useGetPharmacyQuery();
  const { data: pharmacists } = useGetPharmacistsQuery();

  const onItem = (item) => {
    setItem(item);
    setOpenEdit(true);
  };

  const treeData = pharmacies?.map((p) => ({
    title: (
      <Flex className={clsx("gap-[5px]")}>
        {p?.nameid}{" "}
        <EditOutlined
          className={clsx("text-blue ")}
          onClick={() => onItem(p)}
        />
      </Flex>
    ),
    key: p?.codeid,
  }));

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
            <PlusOutlined
              className={clsx("text-blue text-center")}
              onClick={() => setOpenAdd(true)}
            />
          </Tooltip>
        </Flex>
        {/* {addPhar && (
          <Flex className={clsx("px-2")}>
            <Form
              form={form}
              layout="vertical"
              className={clsx(styles.form, "flex flex-col ")}
              onFinish={addMedBtn}
            >
              <Form.Item name="nameid" label="Наименование">
                <Input />
              </Form.Item>

              <Form.Item name="adress" label="Адрес">
                <Input />
              </Form.Item>

              <Form.Item name="phone" label="Номер телефона">
                <Input />
              </Form.Item>
              <Flex className={clsx("pt-2 gap-[3px]")}>
                <button
                  className={clsx(
                    "rounded-lg bg-green text-white p-[2px] flex items-center gap-[2px]"
                  )}
                  onClick={() => addMedBtn()}
                >
                  <PlusOutlined />
                  Добавить
                </button>
                <button
                  className={clsx(
                    "rounded-lg bg-red text-white p-[2px] flex items-center gap-[2px]"
                  )}
                  onClick={() => addMedBtn()}
                >
                  <CloseOutlined />
                  Закрыть
                </button>
              </Flex>
            </Form>
          </Flex>
        )} */}
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
                <Tooltip title={"Добавить фармацевты"}>
                  <PlusOutlined
                    className={clsx("text-blue text-center")}
                    onClick={() => setOpenWar(true)}
                  />
                </Tooltip>
              </th>
              <th style={{ width: "16%" }}>ФИО</th>
              <th style={{ width: "16%" }}>Телефон</th>
              <th style={{ width: "16%" }}>Логин</th>
              <th style={{ width: "16%" }}>Пароль</th>
            </tr>
          </thead>
          <tbody>
            {pharmacists?.map((item) => (
              <tr key={item.codeid}>
                <td>
                  <Flex gap={"small"} wrap="nowrap">
                    <Tooltip title={"Удалить"}>
                      <CloseOutlined
                        className={clsx("text-red")}
                        onClick={() => setOpenWar(true)}
                      />
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
                  <Input value={item.phone} className={clsx("w-full")} />
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
        open={openWar}
        onCancel={() => setOpenWar(false)}
      />
      <AddPharModal open={openAdd} onCancel={() => setOpenAdd(false)} />
      <EditPharModal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        item={item}
      />
    </main>
  );
};
