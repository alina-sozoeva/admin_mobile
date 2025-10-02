import { useGetPatientsQuery } from "../../store";
import { gender } from "../../enums";

import styles from "./PatientsPage.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";

export const PatientsPage = () => {
  const { data: patients } = useGetPatientsQuery();

  return (
    <main className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={clsx(styles.recipeTable)}>
          <thead>
            <tr>
              <th style={{ width: "2%", textAlign: "center" }}>№</th>
              <th style={{ width: "20%" }}>ФИО</th>
              <th style={{ width: "15%" }}>Дата рождения</th>
              <th style={{ width: "20%" }}>Телефон</th>
              <th style={{ width: "20%" }}>Email</th>
              <th style={{ width: "10%" }}>Пол</th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((item, index) => (
              <tr key={item.codeid || index}>
                <td>{index + 1}</td>
                <td>{item.fio}</td>
                <td>
                  {item?.birth_date
                    ? dayjs(item.birth_date).format("DD.MM.YYYY")
                    : "-"}
                </td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{gender[item.gender]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
