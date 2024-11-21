import { records, screening, user, apps, reminders , menu } from "../assets";
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
    name: "reminders",
    imgUrl: reminders,
    link: "/reminders",
  },
  {
    name: "profile",
    imgUrl: user,
    link: "/profile",
  },
];
