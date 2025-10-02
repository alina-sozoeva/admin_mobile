import { useState } from "react";
import { Flex, Form, Input, Select, Tooltip, Tree } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import styles from "./DoctorsPage.module.scss";
import clsx from "clsx";
import { WarningModal } from "../../common";
import { useForm } from "antd/es/form/Form";
import { AddDocModal, EditDocModal } from "../../components";
import { useGetClinicsQuery, useGetDoctorsQuery } from "../../store";

export const DoctorsPage = () => {
  const [form] = useForm();

  // const clinics = [
  //   { key: "0", nameid: "Клиника 1", adress: "Клиника 1 test", phone: "000" },
  //   { key: "1", nameid: "Клиника 2", adress: "Клиника 2 test", phone: "000" },
  //   { key: "2", nameid: "Клиника 3", adress: "Клиника 3 test", phone: "000" },
  // ];

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
  const [openWar, setOpenWar] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState();

  const { data: clinics } = useGetClinicsQuery({});
  const { data: doctors } = useGetDoctorsQuery();

  console.log(clinics, "clinics");

  const onItem = (item) => {
    setItem(item);
    setOpenEdit(true);
  };

  const treeData = clinics?.map((c) => ({
    title: (
      <Flex className={clsx("gap-[5px]")}>
        {c.nameid}{" "}
        <EditOutlined
          className={clsx("text-blue ")}
          onClick={() => onItem(c)}
        />
      </Flex>
    ),
    key: c.key,
  }));

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedClinic(selectedKeys[0]);
    }
  };

  const dataSource = doctors?.filter((d) => d.clinicKey === selectedClinic);

  const [addClinic, setAddClinic] = useState(false);

  const addMedBtn = () => {
    setAddClinic(false);
    form.resetFields();
  };

  return (
    <main className={styles.main}>
      <div className={styles.arr}>
        <Flex gap={"small"} align="center">
          <h3 className={clsx("font-bold")}>Клиники</h3>

          <Tooltip title={"Добавить клинику"}>
            <PlusOutlined
              className={clsx("text-blue text-center")}
              onClick={() => setOpenAdd(true)}
            />
          </Tooltip>
        </Flex>
        {addClinic && (
          <Flex className={clsx("px-2")}>
            <Form
              form={form}
              layout="vertical"
              className={clsx(styles.form, "flex flex-col ")}
            >
              <Form.Item name="login" label="Наименование">
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
        )}
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={["0"]}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
      <Flex vertical className={clsx("w-full")}>
        <h3 className={clsx("font-bold")}>Врачи</h3>
        <table className={clsx(styles.recipeTable)} border={true}>
          <thead>
            <tr>
              <th style={{ width: "3%", textAlign: "center" }}>
                <Tooltip title={"Добавить"}>
                  <PlusOutlined className={clsx("text-blue text-center")} />
                </Tooltip>
              </th>
              <th style={{ width: "3%" }}>№</th>
              <th style={{ width: "16%" }}>ФИО</th>
              <th style={{ width: "16%" }}>Телефон</th>
              <th style={{ width: "16%" }}>Логин</th>
              <th style={{ width: "16%" }}>Пароль</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((item, index) => (
              <tr key={item.id}>
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
                <td>{index + 1}</td>
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
        title={"врача"}
        open={openWar}
        onCancel={() => setOpenWar(false)}
      />
      <AddDocModal open={openAdd} onCancel={() => setOpenAdd(false)} />
      <EditDocModal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        item={item}
      />
    </main>
  );
};
