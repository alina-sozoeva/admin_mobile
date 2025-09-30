import { useForm } from "antd/es/form/Form";
import { Flex, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import styles from "./LoginPage.module.scss";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const { t } = useTranslation();

  const onFinish = async (values) => {
    navigate("/");
  };

  return (
    <section className={clsx(styles.wrap)}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className={styles.form}
      >
        <Typography.Title level={3} className={styles.formTitle}>
          Авторизация
        </Typography.Title>
        <Form.Item
          name="login"
          label="Логин"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input placeholder="Введите логин" style={{ width: "250px" }} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения!",
            },
          ]}
        >
          <Input.Password
            placeholder="Введите пароль"
            style={{ width: "250px" }}
          />
        </Form.Item>

        <Flex align="center" justify="center" className={clsx("w-full py-2")}>
          <button className={clsx(styles.btn)}>Войти</button>
        </Flex>

        <Flex vertical className={clsx(styles.info)}>
          <span>Цифровые решения "Бехруз Софт"</span>
          <span>Номер телефона: +996(555)-954-120</span>
          <span>WhatsApp: +996(555)-954-120</span>
          <span>Почта: admin@333.kg</span>
        </Flex>
      </Form>
    </section>
  );
};
