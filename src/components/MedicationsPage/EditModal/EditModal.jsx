import { Flex, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./EditModal.module.scss";
import clsx from "clsx";

export const EditModal = ({ open, onCancel }) => {
  const [form] = useForm();

  const onFinish = () => {
    onCancel();
  };

  return (
    <Modal open={open} onCancel={onCancel} centered width={300} footer={false}>
      <h2 className={clsx("font-bold")}>Редактировать</h2>
      <Form
        form={form}
        layout="vertical"
        className={clsx(styles.form, "flex flex-col ")}
        onFinish={onFinish}
      >
        <Form.Item name="login" label="Наименование">
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
