import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Overview from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import NotFound from "layouts/authentication/404";
import Teams from "layouts/teams";
import SmartAI from "layouts/smart-ai";
import Production from "layouts/production";

import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoBulb } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  { type: "title", title: "Processes", key: "processes" },
  {
    type: "collapse",
    name: "Sales",
    key: "billing",
    route: "/billing",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Billing,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Procurement",
    key: "tables",
    route: "/tables",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Production",
    key: "production",
    route: "/production",
    icon: <IoBuild size="15px" color="inherit" />,
    component: Production,
    noCollapse: true,
  },
  { type: "title", title: "Account", key: "account" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Overview,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Teams",
    key: "teams",
    route: "/teams",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: Teams,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Smart AI",
    key: "smart-ai",
    route: "/smart-ai",
    icon: <IoBulb size="15px" color="inherit" />,
    component: SmartAI,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "route-only",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: SignUp,
  },
  {
    type: "route-only",
    name: "404 Not Found",
    key: "not-found",
    route: "/authentication/404",
    component: NotFound,
  },
];

export default routes;