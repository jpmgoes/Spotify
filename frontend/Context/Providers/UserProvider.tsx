import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import React from "react";
import { toast } from "react-toastify";

export interface IUserProviderType {
  getPremium: () => void;
  isPremium: boolean;
  verifyIsPremium: () => void;
  getInfo: () => void;
  userData: IUserData | null;
}

interface IUserData {
  id: string;
  name: string;
  email: string;
  bornDate: string | Date;
  collection: string;
  gender: string;
  age: number;
}

export function UserProvider(): IUserProviderType {
  const [isPremium, setIsPremium] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<IUserData | null>(null);

  const getPremium = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    axios
      .patch(
        process.env.API_URL + "/user/give/premium",
        {},
        { params: { user_id }, headers: { Authorization: "Bearer " + token } }
      )
      .then((res: AxiosResponse) => {
        setIsPremium(true);
        toast("Now your are premium user, congrats");
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setIsPremium(false);
      });
  };

  const verifyIsPremium = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    axios
      .get(process.env.API_URL + "/user/allowed/to/play", {
        params: { user_id },
        headers: { Authorization: "Bearer " + token },
      })
      .then((res: AxiosResponse) => {
        const data = res.data as { isAllowed: boolean };
        setIsPremium(data.isAllowed);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setIsPremium(false);
      });
  };

  const getInfo = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    axios
      .get(process.env.API_URL + "/user/info", {
        params: { user_id },
        headers: { Authorization: "Bearer " + token },
      })
      .then((res: AxiosResponse) => {
        const { data } = res.data as { data: IUserData };
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
        setUserData(null);
      });
  };

  return { getPremium, isPremium, verifyIsPremium, getInfo, userData };
}
