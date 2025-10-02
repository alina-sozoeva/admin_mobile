import { Flex, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./MedModal.module.scss";
import clsx from "clsx";
import { useAddGroupDrugMutation } from "../../../store";

export const MedModal = ({ open, onCancel }) => {
  const [form] = useForm();
  const [add] = useAddGroupDrugMutation();

  const onFinish = (values) => {
    add({
      nameid: values.nameid,
    });
    onCancel();
  };

  return (
    <Modal open={open} onCancel={onCancel} centered width={300} footer={false}>
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
        <Flex className={clsx("pt-2 gap-[3px] items-center justify-center")}>
          <button
            className={clsx(
              "rounded-lg bg-green text-white py-[2px] flex items-center justify-center gap-[2px] w-[150px]"
            )}
            type="submit"
          >
            Добавить
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
