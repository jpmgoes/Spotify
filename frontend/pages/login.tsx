import * as React from "react";
import Alert from "../Components/Alert";
import LoginForm from "../Components/Forms/LoginForm";
import { AppContext } from "../Context/AppContext";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  return (
    <>
      <Alert />
      <LoginForm />
    </>
  );
};

export default LoginPage;
