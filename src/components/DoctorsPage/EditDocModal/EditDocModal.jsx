import { Flex, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

import { PlusOutlined } from "@ant-design/icons";

import styles from "./EditDocModal.module.scss";
import clsx from "clsx";
import { useEffect } from "react";
import { useAddСlinicsMutation } from "../../../store";

export const EditDocModal = ({ open, onCancel, item }) => {
  const [form] = useForm();

  const [edit] = useAddСlinicsMutation();

  const onReset = () => {
    onCancel();
    form.resetFields();
  };

  const onFinish = (values) => {
    edit({
      codeid: item?.codeid,
      nameid: values?.nameid,
      adress: values?.adress,
      phone: values?.phone,
    });
    onReset();
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        codeid: item?.codeid,
        nameid: item?.nameid,
        adress: item?.adress,
        phone: item?.phone,
      });
    }
  }, [form, open, item]);

  return (
    <Modal open={open} onCancel={onReset} centered width={300} footer={false}>
      <h2 className={clsx("font-bold")}>Добавить</h2>
      <Form
        form={form}
        layout="vertical"
        className={clsx(styles.form, "flex flex-col ")}
        onFinish={onFinish}
      >
        <Form.Item name="nameid" label="Наименование">
          <Input />
        </Form.Item>

        <Form.Item name="adress" label="Адрес">
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Номер телефона">
          <Input />
        </Form.Item>
        <Flex className={clsx("pt-2 gap-[3px] items-center justify-center")}>
          <button
            className={clsx(
              "rounded-lg bg-green text-white py-[2px] flex items-center justify-center gap-[2px] w-[150px]"
            )}
            type="submit"
          >
            Обновить
          </button>
        </Flex>
      </Form>
    </Modal>
  );
};
