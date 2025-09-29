import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { pathName } from "../../enums";

export const WIPPage = () => {
  const navigate = useNavigate();

  return (
    <main className="container">
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={
          <Button type="primary" onClick={() => navigate(pathName.medications)}>
            На главную
          </Button>
        }
      />
    </main>
  );
};
