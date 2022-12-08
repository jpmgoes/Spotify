import * as React from "react";
import RegisterForm from "../Components/Forms/RegisterForm";
import { AppContext } from "../Context/AppContext";

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  return (
      <RegisterForm />
  );
};

export default RegisterPage;
