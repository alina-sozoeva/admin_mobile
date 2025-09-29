import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import styles from "./CustomTable.module.scss";
import clsx from "clsx";

export const CustomTable = ({ columns, dataSource }) => {
  return (
    <table className={clsx(styles.recipeTable)} border={true}>
      <thead>
        <tr>
          {columns?.map((item) => (
            <th>{item?.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <CloseOutlined /> <SaveOutlined />
          </td>
          {dataSource?.map((item) => (
            <td>{item?.nameid}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
