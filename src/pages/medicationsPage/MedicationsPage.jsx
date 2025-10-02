import { useMemo, useState } from "react";
import { Flex, Input, Select, Tooltip, Tree } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { WarningModal } from "../../common";
import { useForm } from "antd/es/form/Form";

import styles from "./MedicationsPage.module.scss";
import clsx from "clsx";
import { EditModal, MedModal } from "../../components";

import { useGetDrugFormQuery, useGetDrugQuery } from "../../store";

export const MedicationsPage = () => {
  const [form] = useForm();

  const groups = [
    { key: "0", nameid: "Анальгетики" },
    { key: "1", nameid: "Антибиотики" },
    { key: "2", nameid: "Противовирусные" },
  ];

  const [selectedGroup, setSelectedGroup] = useState("0");
  const [open, setOpen] = useState(false);
  const [addMed, setAddMed] = useState(false);
  const [editMed, setEditMed] = useState(false);
  const [item, setItem] = useState();

  const { data: drugs } = useGetDrugQuery({});
  const { data: drugForm } = useGetDrugFormQuery();

  const onItem = (item) => {
    setItem(item);
    setEditMed(true);
  };

  const addMedBtn = () => {
    setAddMed(false);
    form.resetFields();
  };

  const mappedDrugForm = useMemo(() => {
    return drugForm?.map((item) => ({
      value: item.codeid,
      label: item.nameid,
    }));
  }, [drugForm]);

  const treeData = groups.map((g) => ({
    title: (
      <Flex className={clsx("gap-[5px]")}>
        {g.nameid}{" "}
        <EditOutlined
          className={clsx("text-blue ")}
          onClick={() => onItem(g)}
        />
      </Flex>
    ),
    key: g.key,
  }));

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedGroup(selectedKeys[0]);
    }
  };

  const dataSource = drugs?.filter((m) => m.groupKey === selectedGroup);

  return (
    <main className={styles.main}>
      <div className={styles.arr}>
        <Flex gap={"small"} align="center">
          <h3 className={clsx("font-bold")}>Группа медикаментов</h3>

          <Tooltip title={"Добавить группу"}>
            <PlusOutlined
              className={clsx("text-blue text-center")}
              onClick={() => setAddMed(true)}
            />
          </Tooltip>
        </Flex>
        {/* {addMed && (
          <Flex className={clsx("px-2")}>
            <Form
              form={form}
              layout="vertical"
              className={clsx(styles.form, "flex flex-col ")}
            >
              <Form.Item name="login" label="Наименование">
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
        <h3 className={clsx("font-bold")}>Медикаменты</h3>
        <table className={clsx(styles.recipeTable)} border={true}>
          <thead>
            <tr>
              <th style={{ width: "3%", textAlign: "center" }}>
                <Tooltip title={"Добавить медикамент"}>
                  <PlusOutlined className={clsx("text-blue text-center")} />
                </Tooltip>
              </th>
              <th style={{ width: "48.5%" }}>Название</th>
              <th style={{ width: "48.5%" }}>Форма</th>
            </tr>
          </thead>
          <tbody>
            {drugs?.map((item) => (
              <tr key={item.codeid}>
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
                  <Input value={item.nameid} className={clsx("w-full")} />
                </td>
                <td>
                  <Select
                    className={clsx("w-full")}
                    options={mappedDrugForm}
                    value={item.drug_form_codeid}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>
      <WarningModal
        title={"медикамент"}
        open={open}
        onCancel={() => setOpen(false)}
      />
      <MedModal open={addMed} onCancel={() => addMedBtn()} />
      <EditModal
        open={editMed}
        onCancel={() => setEditMed(false)}
        item={item}
      />
    </main>
  );
};
