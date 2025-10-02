import { useEffect, useState } from "react";
import { Flex, Input, Spin, Tooltip, Tree } from "antd";
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
import { AddDocModal, EditDocModal } from "../../components";
import {
  useAddDoctorMutation,
  useGetClinicsQuery,
  useGetDoctorsQuery,
} from "../../store";

export const DoctorsPage = () => {
  const [editableDoc, setEditableDoc] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("0");
  const [openWar, setOpenWar] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState();

  const {
    data: clinics,
    isLoading: isLoadingClinics,
    isFetching: isFetchingClinics,
  } = useGetClinicsQuery({});
  const {
    data: doctors,
    isLoading: isLoadingDoctors,
    isFetching: isFetchingDoctors,
  } = useGetDoctorsQuery();

  const [add] = useAddDoctorMutation();

  const onItem = (item) => {
    setItem(item);
    setOpenEdit(true);
  };

  useEffect(() => {
    if (doctors?.length > 0 && editableDoc?.length === 0) {
      setEditableDoc(doctors.map((d) => ({ ...d, isNew: false })));
    }
  }, [doctors, editableDoc?.length]);

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

  const loading =
    isFetchingClinics ||
    isFetchingDoctors ||
    isLoadingClinics ||
    isLoadingDoctors;

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedClinic(selectedKeys[0]);
    }
  };

  const addNewDoc = () => {
    setEditableDoc((prev) => [
      {
        codeid: `new-${Date.now()}`,
        nameid: "",
        phone: "",
        login: "",
        password: "",
        isNew: true,
      },
      ...prev,
    ]);
  };

  const saveDoc = (item) => {
    add({
      codeid: item.isNew ? 0 : item.codeid,
      nameid: item.nameid,
      phone: item.phone,
      login: item.login,
      password: item.password,
    });
  };

  const removeDoc = (item) => {
    if (item.isNew) {
      setEditableDoc((prev) => prev.filter((m) => m.codeid !== item.codeid));
    } else {
      setOpenWar(true);
    }
  };

  const dataSource = doctors?.filter((d) => d.clinicKey === selectedClinic);

  return (
    <Spin spinning={loading}>
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
                    <PlusOutlined
                      className={clsx("text-blue text-center")}
                      onClick={addNewDoc}
                    />
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
              {editableDoc?.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <Flex gap={"small"} wrap="nowrap">
                      <Tooltip title={"Удалить"}>
                        <CloseOutlined
                          className={clsx("text-red")}
                          onClick={() => removeDoc(item)}
                        />
                      </Tooltip>
                      <Tooltip title={"Сохранить"}>
                        <SaveOutlined
                          className={clsx("text-blue")}
                          onClick={() => saveDoc(item)}
                        />
                      </Tooltip>
                    </Flex>
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <Input
                      value={item.nameid}
                      className={clsx("w-full")}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEditableDoc((prev) =>
                          prev.map((m) =>
                            m.codeid === item.codeid
                              ? { ...m, nameid: newValue }
                              : m
                          )
                        );
                      }}
                    />
                  </td>

                  <td>
                    <Input
                      value={item.phone}
                      className={clsx("w-full")}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEditableDoc((prev) =>
                          prev.map((m) =>
                            m.codeid === item.codeid
                              ? { ...m, phone: newValue }
                              : m
                          )
                        );
                      }}
                    />
                  </td>

                  <td>
                    <Input
                      value={item.login}
                      className={clsx("w-full")}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEditableDoc((prev) =>
                          prev.map((m) =>
                            m.codeid === item.codeid
                              ? { ...m, login: newValue }
                              : m
                          )
                        );
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      value={item.password}
                      className={clsx("w-full")}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEditableDoc((prev) =>
                          prev.map((m) =>
                            m.codeid === item.codeid
                              ? { ...m, password: newValue }
                              : m
                          )
                        );
                      }}
                    />
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
    </Spin>
  );
};
