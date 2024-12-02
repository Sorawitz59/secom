import { lazy } from "react";

import { RouteObject } from "react-router-dom";

import Loadable from "../components/third-patry/Loadable";

import FullLayout from "../layout/FullLayout";


const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));

const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));

const Customer = Loadable(lazy(() => import("../pages/customer")));

const CreateCustomer = Loadable(lazy(() => import("../pages/customer/create")));

const EditCustomer = Loadable(lazy(() => import("../pages/customer/edit")));

const TransportCompanies = Loadable(lazy(() => import("../pages/transportcompanies")));

const TransportCompaniesCreate = Loadable(lazy(() => import("../pages/transportcompanies/create")));

const TransportCompaniesEdit = Loadable(lazy(() => import("../pages/transportcompanies/edit")));

const TransportForm = Loadable(lazy(() => import("../pages/transportcompanies/form")));

const TransportSeacrh = Loadable(lazy(() => import("../pages/transportcompanies/search")));

const AdminRoutes = (isLoggedIn: boolean): RouteObject => {

  return {

    path: "/",

    element: isLoggedIn ? <FullLayout /> : <MainPages />,

    children: [

      {

        path: "/",

        element: <Dashboard />,

      },

      {

        path: "/transportcompanies/form",

        element: <TransportForm />,

      },

      {

        path: "/transportcompanies/search",

        element: <TransportSeacrh />,

      },

      {

        path: "/customer",

        children: [

          {

            path: "/customer",

            element: <Customer />,

          },

          {

            path: "/customer/create",

            element: <CreateCustomer />,

          },

          {

            path: "/customer/edit/:id",

            element: <EditCustomer />,

          },

        ],

      },

      //TransportCompanies
      {

        path: "/transportcompanies",

        children: [

          {

            path: "/transportcompanies",

            element: <TransportCompanies />,

          },

          {

            path: "/transportcompanies/create",

            element: <TransportCompaniesCreate />,

          },

          {

            path: "/transportcompanies/edit/:id",

            element: <TransportCompaniesEdit />,

          },


        ],

      },

    ],

  };

};


export default AdminRoutes;