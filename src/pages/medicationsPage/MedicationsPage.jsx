import { useState } from "react";
import { Flex, Input, Select, Tooltip, Tree } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import styles from "./MedicationsPage.module.scss";
import clsx from "clsx";
import { WarningModal } from "../../common";

export const MedicationsPage = () => {
  const groups = [
    { key: "0", title: "Анальгетики" },
    { key: "1", title: "Антибиотики" },
    { key: "2", title: "Противовирусные" },
  ];

  const allMedications = [
    { id: 1, name: "Парацетамол", groupKey: "0" },
    { id: 2, name: "Ибупрофен", groupKey: "0" },
    { id: 3, name: "Амоксициллин", groupKey: "1" },
    { id: 4, name: "Цефтриаксон", groupKey: "1" },
    { id: 5, name: "Ацикловир", groupKey: "2" },
  ];

  const [selectedGroup, setSelectedGroup] = useState("0");
  const [open, setOpen] = useState(false);

  const treeData = groups.map((g) => ({ title: g.title, key: g.key }));

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) {
      setSelectedGroup(selectedKeys[0]);
    }
  };

  const dataSource = allMedications.filter((m) => m.groupKey === selectedGroup);

  return (
    <main className={styles.main}>
      <div className={styles.arr}>
        <Flex gap={"small"} align="center">
          <h3 className={clsx("font-bold")}>Группа медикаментов</h3>

          <Tooltip title={"Добавить группу"}>
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
        <h3 className={clsx("font-bold")}>Медикаменты</h3>
        <table className={clsx(styles.recipeTable)} border={true}>
          <thead>
            <tr>
              <th style={{ width: "3%", textAlign: "center" }}>
                <Tooltip title={"Добавить"}>
                  <PlusOutlined className={clsx("text-blue text-center")} />
                </Tooltip>
              </th>
              <th style={{ width: "48.5%" }}>Название</th>
              <th style={{ width: "48.5%" }}>Форма</th>
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
                  <Select
                    defaultValue="test1"
                    className={clsx("w-full")}
                    options={[
                      { value: "test1", label: "test1" },
                      { value: "test2", label: "test2" },
                      { value: "test3", label: "test3" },
                      { value: "test4", label: "test4" },
                    ]}
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
    </main>
  );
};
