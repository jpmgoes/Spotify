import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import React from "react";

interface IGeneralBoxInput {
  id: String;
  label: String;
  register: UseFormRegisterReturn;
  errors: string | undefined;
}

interface IBoxInput {
  placeholder: string;
}

interface IRadioBox {
  id: String;
  name: String;
  label: String;
  register: UseFormRegisterReturn;
}

interface IGeneralBoxInputAny {
  type: String;
}

interface ISelectBox {
  register: UseFormRegisterReturn;
  children: JSX.Element[] | JSX.Element;
  label: string;
  id: string;
}

export type ICompleteBoxInput = IGeneralBoxInput & IBoxInput;
type IGenericTextInput = IGeneralBoxInputAny & ICompleteBoxInput;

export class FormComponents {
  static FormComponents: IGeneralBoxInput & IBoxInput;
  private static boxInputDefault({
    label,
    id,
    placeholder,
    type,
    register,
    errors,
  }: IGenericTextInput) {
    return (
      <div className="col-span-3">
        <label
          htmlFor={id.toString()}
          className="block text-left text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type.toString()}
          id={id.toString()}
          placeholder={placeholder}
          {...register}
          className="mt-1 block h-12 w-full rounded border-[1px] border-gray-400 px-4 shadow-sm hover:border-black focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
        />
        <p className="w-full text-left text-red-600">{errors}</p>
      </div>
    );
  }

  static inputTextBox = ({
    label,
    id,
    placeholder,
    register,
    errors,
  }: ICompleteBoxInput) => {
    const type = "text";
    return this.boxInputDefault({
      label,
      id,
      placeholder,
      type,
      register,
      errors,
    });
  };

  static inputPassBox = ({
    label,
    id,
    placeholder,
    register,
    errors,
  }: ICompleteBoxInput) => {
    const type = "password";
    return this.boxInputDefault({
      label,
      id,
      placeholder,
      type,
      register,
      errors,
    });
  };

  static selectBox = ({ label, id, children, register }: ISelectBox) => {
    return (
      <>
        <label
          htmlFor={id.toString()}
          className="block text-left text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select
          id={id.toString()}
          className="mt-1 block w-full rounded border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          {...register}
        >
          {children}
        </select>
      </>
    );
  };

  static radioBoxItem = ({ id, label, name, register }: IRadioBox) => {
    return (
      <div className="flex items-center justify-center p-3 text-center align-middle">
        <input
          {...register}
          id={id.toString()}
          name={name.toString()}
          type="radio"
          className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
          value={label.toString()}
        />
        <label
          htmlFor={id.toString()}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      </div>
    );
  };

  static checkboxItem = ({ register, labelTxt }: any) => {
    return (
      <div className="flex items-center gap-3">
        <input
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          type="checkbox"
          {...register}
          value="true"
        />
        <label className="text-left font-medium text-gray-700">
          {labelTxt}
        </label>
      </div>
    );
  };

  static alertMessage = ({ errors }: { errors: string }) => {
    return (
      <div className="self-start text-sm text-red-600">
        <div className="flex items-center justify-between gap-3">
          <span className="h-2">
            <RiErrorWarningFill />
          </span>
          <span className="h-4"> {errors} </span>
        </div>
      </div>
    );
  };
}
