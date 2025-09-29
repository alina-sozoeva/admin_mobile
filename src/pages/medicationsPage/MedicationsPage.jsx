import { Flex, Input, Select, Tooltip } from "antd";
import { CloseOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import styles from "./MedicationsPage.module.scss";
import clsx from "clsx";

export const MedicationsPage = () => {
  const dataSource = [
    {
      nameid: "Парацетамол",
    },
    {
      nameid: "Амоксициллин",
    },
  ];

  return (
    <main>
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
    </main>
  );
};
