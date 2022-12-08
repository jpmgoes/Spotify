import * as React from "react";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppSharedContext } from "../../Context/AppContext";
import Router from "next/router";
import { FormComponents } from "../Classes/FormComponents";
import Link from "next/link";

interface ILoginFormProps {}

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const { authProvider } = React.useContext(AppSharedContext);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    authProvider.signin({ email, password });
  };
  
  return (
    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center text-center">
        <img
          src="/logo-black.png"
          alt="logo"
          className="w-32 cursor-pointer self-center py-8"
          onClick={() => {
            Router.push("/");
          }}
        />
        <hr />
        <div className="w-3/6 self-center overflow-hidden max-lg:min-w-full">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="flex flex-col">
              <div className="flex flex-col py-3">
                <FormComponents.inputTextBox
                  label="Endereço de e-mail"
                  id="email"
                  placeholder="Endereço de e-mail"
                  register={register("email")}
                  errors={errors.email?.message}
                />
                {errors.email?.message !== undefined ? (
                  <FormComponents.alertMessage errors={errors.email.message} />
                ) : (
                  <></>
                )}
              </div>

              <FormComponents.inputPassBox
                label="Senha"
                id="pass"
                placeholder="Senha"
                register={register("password")}
                errors={errors.password?.message}
              />
              {errors.password?.message !== undefined ? (
                <FormComponents.alertMessage errors={errors.password.message} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4 pt-6 pb-16">
            <button
              type="submit"
              className="h-16 w-48 items-center justify-center self-center rounded-full bg-green-500 p-3 px-8 font-bold duration-150 ease-out hover:scale-105 hover:bg-green-400"
            >
              Entrar
            </button>
            <hr />
            <p className="text-xl font-bold">Não tem uma conta?</p>
            <Link href={"/register"}>
              <div className="flex h-12 items-center justify-center rounded-full border border-black text-center text-sm font-bold tracking-widest text-neutral-500">
                {"Inscrever-se no Spotify".toUpperCase()}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
