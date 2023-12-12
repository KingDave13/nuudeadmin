import { 
  requests,
  guests,
  members,
  announcements,
} from "@public/assets";
  
  export const sideLinks = [
    {
      id: 'requests',
      title: 'Requests',
      route: '/requests',
      Icon: requests,
    },
    {
      id: 'guests',
      title: 'Guest List',
      route: '/guests',
      Icon: guests,
    },
    {
      id: 'members',
      title: 'Members',
      route: '/members',
      Icon: members,
    },
    {
      id: 'announcements',
      title: 'Announcements',
      route: '/announcements',
      Icon: announcements,
    },
  ];