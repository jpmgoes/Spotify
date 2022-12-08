import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import React from "react";
import { toast } from "react-toastify";

export interface IAuthContextType {
  user: IUser | null;
  signin: ({}: ILogin) => void;
  signout: () => void;
  auth: boolean;
  token: string | null;
  createAccount: (data: ICreateUser) => void;
  isAuth: () => void;
}

interface ILogin {
  email: string;
  password: string;
}

interface ILoginRes {
  token: string;
  user_data: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  bornDate: string | Date;
  gender: string;
}

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  bornDate: string;
  gender: string;
}

export function AuthProvider(): IAuthContextType {
  const [token, setToken] = React.useState<string | null>(null);
  const [auth, setAuth] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUser | null>(null);

  const signin = ({ email, password }: ILogin) => {
    axios
      .post(process.env.API_URL + "/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const data: ILoginRes = res.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_data.id);
        setToken(data.token);
        setAuth(true);
        setUser(data.user_data);
        toast("Login feito");
        setTimeout(() => {
          Router.push("/");
        }, 2000);
      })
      .catch((res: AxiosError) => {
        toast("email ou senha invalidos");
      });
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUser(null);
    setToken(null);
    setAuth(false);
  };

  const createAccount = (data: ICreateUser) => {
    axios
      .post(process.env.API_URL + "/user/create", data)
      .then(() => {
        toast("Conta Criada");
        setTimeout(() => {
          Router.push("/login");
        }, 2000);
      })
      .catch((erro: AxiosError) => {
        console.log(erro.response?.data);
        if (erro.response?.data) {
          toast("Esse email já está sendo usado");
        } else {
          toast("não foi possível criar a conta");
        }
      });
  };

  const isAuth = () => {
    const token = localStorage.getItem("token");
    axios
      .get(process.env.API_URL + "/auth", {
        params: { jwt: token },
        headers: { Authorization: "Bearer " + token },
      })
      .then((res: AxiosResponse) => {
        const user_id = res.data.data.id;
        setAuth(true);
        localStorage.setItem("user_id", user_id);
      })
      .catch((erro) => {
        signout();
      });
  };

  return { user, signin, signout, auth, token, createAccount, isAuth };
}
