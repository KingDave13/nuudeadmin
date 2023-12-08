export {default} from 'next-auth/middleware';

export const config = {
    matcher: ['/requests', '/members', '/guests', '/announcements'],
};