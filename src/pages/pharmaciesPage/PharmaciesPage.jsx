import { useEffect, useState } from "react";
import { Flex, Input, Spin, Tooltip, Tree } from "antd";
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
import {
  useAddPharmacistMutation,
  useGetPharmacistsQuery,
  useGetPharmacyQuery,
} from "../../store";

export const PharmaciesPage = () => {
  const [editablePhars, setEditablePhars] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState("0");
  const [openWar, setOpenWar] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState();

  const {
    data: pharmacies,
    isLoading: isLoadingPharmacies,
    isFetching: isFetchingPharmacies,
  } = useGetPharmacyQuery();
  const {
    data: pharmacists,
    isLoading: isLoadingPharmacists,
    isFetching: isFetchingPharmacists,
  } = useGetPharmacistsQuery();

  const [add] = useAddPharmacistMutation();

  const onItem = (item) => {
    setItem(item);
    setOpenEdit(true);
  };

  useEffect(() => {
    if (pharmacists?.length > 0 && editablePhars?.length === 0) {
      setEditablePhars(pharmacists.map((d) => ({ ...d, isNew: false })));
    }
  }, [pharmacists, editablePhars?.length]);

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

  const loading =
    isFetchingPharmacies ||
    isFetchingPharmacists ||
    isLoadingPharmacies ||
    isLoadingPharmacists;

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedPharmacy(selectedKeys[0]);
    }
  };

  const addNewPhars = () => {
    setEditablePhars((prev) => [
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

  const savePhars = (item) => {
    add({
      codeid: item.isNew ? 0 : item.codeid,
      nameid: item.nameid,
      phone: item.phone,
      login: item.login,
      password: item.password,
    });
  };

  const removePhars = (item) => {
    if (item.isNew) {
      setEditablePhars((prev) => prev.filter((m) => m.codeid !== item.codeid));
    } else {
      setOpenWar(true);
    }
  };

  const dataSource = pharmacies?.filter(
    (p) => p.pharmacyKey === selectedPharmacy
  );

  return (
    <Spin spinning={loading}>
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
                      onClick={addNewPhars}
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
              {editablePhars?.map((item) => (
                <tr key={item.codeid}>
                  <td>
                    <Flex gap={"small"} wrap="nowrap">
                      <Tooltip title={"Удалить"}>
                        <CloseOutlined
                          className={clsx("text-red")}
                          onClick={() => removePhars(item)}
                        />
                      </Tooltip>
                      <Tooltip title={"Сохранить"}>
                        <SaveOutlined
                          className={clsx("text-blue")}
                          onClick={() => savePhars(item)}
                        />
                      </Tooltip>
                    </Flex>
                  </td>
                  <td>
                    <Input
                      value={item.nameid}
                      className={clsx("w-full")}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEditablePhars((prev) =>
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
                        setEditablePhars((prev) =>
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
                        setEditablePhars((prev) =>
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
                        setEditablePhars((prev) =>
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
    </Spin>
  );
};
