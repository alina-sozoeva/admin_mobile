import { Flex, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./EditModal.module.scss";
import clsx from "clsx";
import { useEffect } from "react";
import { useAddGroupDrugMutation } from "../../../store";

export const EditModal = ({ open, onCancel, item }) => {
  const [form] = useForm();

  const [edit] = useAddGroupDrugMutation();

  const onFinish = (values) => {
    edit({
      codeid: item?.codeid,
      nameid: values?.nameid,
    });
    onCancel();
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        codeid: item?.codeid,
        nameid: item?.nameid,
      });
    }
  }, [form, open, item]);

  return (
    <Modal open={open} onCancel={onCancel} centered width={300} footer={false}>
      <h2 className={clsx("font-bold")}>Редактировать</h2>
      <Form
        form={form}
        layout="vertical"
        className={clsx(styles.form, "flex flex-col ")}
        onFinish={onFinish}
      >
        <Form.Item name="nameid" label="Наименование">
          <Input />
        </Form.Item>
        <Flex className={clsx("pt-2 gap-[3px] items-center justify-center")}>
          <button
            className={clsx(
              "rounded-lg bg-green text-white py-[2px] flex items-center justify-center gap-[2px] w-[200px]"
            )}
            type="submit"
          >
            Обновить
          </button>
          {/* <button
            className={clsx(
              "rounded-lg bg-red text-white p-[2px] flex items-center gap-[2px]"
            )}
            onClick={() => onCancel()}
          >
            <CloseOutlined />
            Закрыть
          </button> */}
        </Flex>
      </Form>
    </Modal>
  );
};
