import { TbArrowsLeftRight } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { PiCrownSimple } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
  
export const sideLinks = [
  {
    id: 'requests',
    title: 'Requests',
    route: '/requests',
    Icon: TbArrowsLeftRight,
  },
  {
    id: 'guests',
    title: 'Guest List',
    route: '/guests',
    Icon: GoPeople,
  },
  {
    id: 'members',
    title: 'Members',
    route: '/members',
    Icon: PiCrownSimple,
  },
  {
    id: 'announcements',
    title: 'Announcements',
    route: '/announcements',
    Icon: HiOutlineSpeakerphone,
  },
];