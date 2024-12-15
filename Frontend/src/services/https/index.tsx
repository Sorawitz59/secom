import { UsersInterface } from "../../interfaces/IUser";

import { SignInInterface } from "../../interfaces/SignIn";

import { TransportCompaniesInterface } from "../../interfaces/TransportCompanies";

import { TransportVehiclesInterface } from "../../interfaces/TransportVehicles";

import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};

async function GetTransportCompanies() {
  return await axios
    .get(`${apiUrl}/transportcompanies`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTransportCompaniesById(id: string) {
  return await axios
    .get(`${apiUrl}/transportcompanies/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateTransportCompanies(data: TransportCompaniesInterface) {
  try {
    const response = await axios.post(`${apiUrl}/transportcompanies`, data, requestOptions);
    return response; // ส่ง response กลับเมื่อสำเร็จ
  } catch (error: any) {
    return error.response; // จัดการและส่ง error response กลับเมื่อเกิดข้อผิดพลาด
  }
}


async function UpdateTransportCompaniesById(id: string, data: TransportCompaniesInterface) {
  return await axios
    .put(`${apiUrl}/transportcompanies/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteTransportCompaniesById(id: string) {
  return await axios
    .delete(`${apiUrl}/transportcompanies/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}


async function SignIn(data: SignInInterface) {

  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetUsers() {

  return await axios

    .get(`${apiUrl}/users`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function GetUsersById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function UpdateUsersById(id: string, data: UsersInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function DeleteUsersById(id: string) {

  return await axios

    .delete(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function CreateUser(data: UsersInterface) {

  return await axios

    .post(`${apiUrl}/signup`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetTransportVehicle() {
  return await axios
    .get(`${apiUrl}/transportvehicle`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTransportVehicleById(id: string) {
  return await axios
    .get(`${apiUrl}/transportvehicle/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateTransportVehicle(data: TransportVehiclesInterface) {
  return await axios
    .post(`${apiUrl}/transportvehicle`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateTransportVehicleById(id: string, data: TransportVehiclesInterface) {
  return await axios
    .put(`${apiUrl}/transportvehicle/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteTransportVehicleById(id: string) {
  return await axios
    .delete(`${apiUrl}/transportvehicle/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UploadVehicleImage(data: { company_id: string; image_url: string }) {
  return await axios
    .post(`${apiUrl}/uploadvehicleimage`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTransportVehicleTypes() {
  return await axios
    .get(`${apiUrl}/transportvehicletypes`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTransportVehicleTypeById(id: string) {
  return await axios
    .get(`${apiUrl}/transportvehicletypes/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateTransportVehicleType(data: any) {
  return await axios
    .post(`${apiUrl}/transportvehicletypes`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateTransportVehicleTypeById(id: string, data: any) {
  return await axios
    .put(`${apiUrl}/transportvehicletypes/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteTransportVehicleTypeById(id: string) {
  return await axios
    .delete(`${apiUrl}/transportvehicletypes/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {

  SignIn,

  GetUsers,

  GetUsersById,

  UpdateUsersById,

  DeleteUsersById,

  CreateUser,

  GetTransportCompanies,
  CreateTransportCompanies,
  GetTransportCompaniesById,
  UpdateTransportCompaniesById,
  DeleteTransportCompaniesById,

  GetTransportVehicle,
  GetTransportVehicleById,
  CreateTransportVehicle,
  UpdateTransportVehicleById,
  DeleteTransportVehicleById,
  UploadVehicleImage,

  GetTransportVehicleTypes,
  GetTransportVehicleTypeById,
  CreateTransportVehicleType,
  UpdateTransportVehicleTypeById,
  DeleteTransportVehicleTypeById,
};