import { records, screening, user, apps } from "../assets";
import { IconHome } from "@tabler/icons-react";
export const navlinks = [
  {
    name: "dashboard",
    imgUrl: apps,
    link: "/",
  },
  {

    
    name: "records",
    imgUrl: records,
    link: "/medical-records",
  },

  {
    name: "screening",
    imgUrl: screening,
    link: "/screening-schedules",
  },

  {
    name: "profile",
    imgUrl: user,
    link: "/profile",
  },
];
