import Link from "next/link";
import Router from "next/router";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as React from "react";
import { AppContext, AppSharedContext } from "../../Context/AppContext";
import { LogicalUtils } from "../../Utils/LogicalUtils";
import { FormComponents } from "../Classes/FormComponents";
import { toast } from "react-toastify";

interface IRegisterFormProps {}

type Inputs = {
  email: string;
  password: string;
  bornDate_d: string;
  bornDate_m: string;
  bornDate_y: string;
  genero: string;
  name: string;
  marketing: string | boolean;
  terms: string | boolean;
  share: string | boolean;
};

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za/-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,}$/
      )
      .required(),
    bornDate_d: yup.string().required(),
    bornDate_m: yup.string().required(),
    bornDate_y: yup.string().required(),
    genero: yup.string().required(),
    marketing: yup.string(),
    share: yup.string(),
    terms: yup.string().required(),
  })
  .required();

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const currentYear = +new Date().toISOString().split("-")[0];
  const minimalToSelectYear = currentYear - 120 + 1;
  const allMonthNames = LogicalUtils.getAllMonthNames();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const { authProvider } = React.useContext(AppSharedContext);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.terms === "false") {
      toast("Aceite os termos de uso");
      return;
    }
    const birthday = new Date(
      [data.bornDate_d, data.bornDate_m, data.bornDate_y].join("/")
    ).toISOString();
    authProvider.createAccount({
      name: data.name,
      email: data.email,
      password: data.password,
      bornDate: birthday,
      gender: data.genero,
    });
  };

  React.useEffect(() => {
    if (authProvider.auth) Router.push("/");
  }, [authProvider.auth]);

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
        <div className="text-3xl font-bold">
          Inscreva-se grátis e comece a curtir.
        </div>
        <div className="w-3/6 self-center overflow-hidden max-lg:min-w-full">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <FormComponents.inputTextBox
                label="Qual é o seu e-mail?"
                id="email"
                placeholder="Insira seu e-mail."
                register={register("email")}
                errors={errors.email?.message}
              />

              <FormComponents.inputTextBox
                label="Como devemos chamar você?"
                id="full-name"
                placeholder="Insira um nova de perfil."
                register={register("name")}
                errors={errors.name?.message}
              />

              <FormComponents.inputPassBox
                label="Crie uma senha?"
                id="pass"
                placeholder="Crie uma senha."
                register={register("password")}
                errors={
                  errors.password
                    ? "Minimum eight characters, at least one letter, one number and one special character"
                    : undefined
                }
              />

              <div className="col-span-1">
                <FormComponents.selectBox
                  register={register("bornDate_d")}
                  label="Dia"
                  id="data-d"
                >
                  {new Array(31).fill(null).map((_, index) => {
                    const value = (index + 1).toString();
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </FormComponents.selectBox>
              </div>

              <div className="col-span-1">
                <FormComponents.selectBox
                  register={register("bornDate_m")}
                  label="Mês"
                  id="data-m"
                >
                  {new Array(12).fill(null).map((_, index) => {
                    const value: string = allMonthNames[index]?.toString();
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </FormComponents.selectBox>
              </div>

              <div className="col-span-1">
                <FormComponents.selectBox
                  register={register("bornDate_y")}
                  label="Ano"
                  id="data-y"
                >
                  {new Array(120).fill(null).map((_, index) => {
                    const value: string = (
                      index + minimalToSelectYear
                    ).toString();
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </FormComponents.selectBox>
              </div>

              <div className="col-span-3 flex flex-col gap-2">
                <label className="block text-left text-sm font-medium text-gray-700">
                  Qual é o seu gênero?
                </label>
                <div className="flex flex-row gap-8">
                  <div className="flex items-center">
                    <FormComponents.radioBoxItem
                      label="Masculino"
                      id="radio-masculino"
                      name="genero"
                      register={register("genero")}
                    />

                    <FormComponents.radioBoxItem
                      label="Feminino"
                      id="radio-feminino"
                      name="genero"
                      register={register("genero")}
                    />

                    <FormComponents.radioBoxItem
                      label="Outro"
                      id="radio-outro"
                      name="genero"
                      register={register("genero")}
                    />
                    <p className="w-full text-left text-red-600">
                      {errors.genero ? "Escolha um gênero" : <></>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-3 flex flex-col gap-3">
                <FormComponents.checkboxItem
                  labelTxt="Não quero receber mensagens de marketing do Spotify"
                  name="cb-select"
                  register={register("marketing")}
                  value="cb-notify"
                />

                <FormComponents.checkboxItem
                  labelTxt="Compartilhar meus dados cadastrais com os provedores de conteúdo do Spotify para fins de marketing."
                  name="cb-select"
                  register={register("share")}
                  value="cb-notify"
                />

                <FormComponents.checkboxItem
                  labelTxt="Eu concordo com os Termos e Condições de Uso do Spotify."
                  name="cb-select"
                  register={register("terms")}
                  value="cb-notify"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4 pt-6 pb-16">
            <button
              type="submit"
              className="h-16 w-48 items-center justify-center self-center rounded-full bg-green-500 p-3 px-8 font-bold duration-150 ease-out hover:scale-105 hover:bg-green-400"
            >
              Inscrever-se
            </button>
            <div>
              Já tem uma conta?{" "}
              <Link href={"/login"} className="text-green-500 underline">
                Faça login.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
