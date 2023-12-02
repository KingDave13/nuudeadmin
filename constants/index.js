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
      route: '/admin/requests',
      Icon: requests,
    },
    {
      id: 'guests',
      title: 'Guest List',
      route: '/admin/guests',
      Icon: guests,
    },
    {
      id: 'members',
      title: 'Members',
      route: '/admin/members',
      Icon: members,
    },
    {
      id: 'announcements',
      title: 'Announcements',
      route: '/admin/announcements',
      Icon: announcements,
    },
  ];