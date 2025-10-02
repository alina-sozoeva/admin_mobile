import { useEffect, useMemo, useState } from "react";
import { Flex, Input, Select, Spin, Tooltip, Tree } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { WarningModal } from "../../common";
import { EditModal, MedModal } from "../../components";

import styles from "./MedicationsPage.module.scss";
import clsx from "clsx";

import {
  useAddDrugMutation,
  useGetDrugFormQuery,
  useGetDrugQuery,
  useGetGroupDrugQuery,
} from "../../store";

export const MedicationsPage = () => {
  const [editableMeds, setEditableMeds] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("0");
  const [open, setOpen] = useState(false);
  const [addMed, setAddMed] = useState(false);
  const [editMed, setEditMed] = useState(false);
  const [item, setItem] = useState();

  const {
    data: drugs = [],
    isLoading: isLoadingDrugs,
    isFetching: isFetchingDrugs,
  } = useGetDrugQuery({});
  const {
    data: groupDrugs = [],
    isLoading: isLoadingGroupDrugs,
    isFetching: isFetchingGroupDrugs,
  } = useGetGroupDrugQuery();
  const {
    data: drugForm = [],
    isLoading: isLoadingDrugForm,
    isFetching: isFetchingDrugForm,
  } = useGetDrugFormQuery();

  const [addDrugMutation] = useAddDrugMutation();

  useEffect(() => {
    if (drugs?.length > 0 && editableMeds?.length === 0) {
      setEditableMeds(drugs.map((d) => ({ ...d, isNew: false })));
    }
  }, [drugs, editableMeds?.length]);

  const mappedDrugForm = useMemo(
    () =>
      drugForm.map((item) => ({
        value: item.codeid,
        label: item.nameid,
      })),
    [drugForm]
  );

  const treeData = groupDrugs.map((g) => ({
    title: (
      <Flex className={clsx("gap-[5px]")}>
        {g.nameid}{" "}
        <EditOutlined
          className={clsx("text-blue")}
          onClick={() => {
            setItem(g);
            setEditMed(true);
          }}
        />
      </Flex>
    ),
    key: g.codeid,
  }));

  const loading =
    isLoadingDrugs ||
    isFetchingDrugs ||
    isLoadingGroupDrugs ||
    isFetchingGroupDrugs ||
    isLoadingDrugForm ||
    isFetchingDrugForm;

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length > 0) setSelectedGroup(selectedKeys[0]);
  };

  const addNewMed = () => {
    setEditableMeds((prev) => [
      {
        codeid: `new-${Date.now()}`,
        nameid: "",
        drug_form_codeid: null,
        isNew: true,
      },
      ...prev,
    ]);
  };

  const saveMed = (item) => {
    addDrugMutation({
      codeid: item.isNew ? 0 : item.codeid,
      nameid: item.nameid,
      drug_form_codeid: item.drug_form_codeid,
    });
  };

  const removeMed = (item) => {
    if (item.isNew) {
      setEditableMeds((prev) => prev.filter((m) => m.codeid !== item.codeid));
    } else {
      setOpen(true);
    }
  };

  const filteredMeds = editableMeds?.filter(
    (m) => m.groupKey === selectedGroup || m.isNew
  );

  return (
    <Spin spinning={loading}>
      <main className={styles.main}>
        <div className={styles.arr}>
          <Flex gap="small" align="center">
            <h3 className={clsx("font-bold")}>Группа медикаментов</h3>
            <Tooltip title="Добавить группу">
              <PlusOutlined
                className={clsx("text-blue")}
                onClick={() => setAddMed(true)}
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

        <Flex vertical className="w-full">
          <h3 className={clsx("font-bold")}>Медикаменты</h3>
          <table className={clsx(styles.recipeTable)}>
            <thead>
              <tr>
                <th style={{ width: "3%", textAlign: "center" }}>
                  <Tooltip title="Добавить медикамент">
                    <PlusOutlined
                      className={clsx("text-blue")}
                      onClick={addNewMed}
                    />
                  </Tooltip>
                </th>
                <th style={{ width: "48.5%" }}>Название</th>
                <th style={{ width: "48.5%" }}>Форма</th>
              </tr>
            </thead>
            <tbody>
              {editableMeds?.map((item) => (
                <tr key={item?.codeid}>
                  <td>
                    <Flex gap="small">
                      <Tooltip title="Удалить">
                        <CloseOutlined
                          className="text-red"
                          onClick={() => removeMed(item)}
                        />
                      </Tooltip>
                      <Tooltip title="Сохранить">
                        <SaveOutlined
                          className="text-blue"
                          onClick={() => saveMed(item)}
                        />
                      </Tooltip>
                    </Flex>
                  </td>
                  <td>
                    <Input
                      value={item.nameid}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEditableMeds((prev) =>
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
                    <Select
                      value={item.drug_form_codeid}
                      options={mappedDrugForm}
                      onChange={(value) => {
                        setEditableMeds((prev) =>
                          prev.map((m) =>
                            m.codeid === item.codeid
                              ? { ...m, drug_form_codeid: value }
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
          title="медикамент"
          open={open}
          onCancel={() => setOpen(false)}
        />
        <MedModal open={addMed} onCancel={() => setAddMed(false)} />
        <EditModal
          open={editMed}
          onCancel={() => setEditMed(false)}
          item={item}
        />
      </main>
    </Spin>
  );
};
