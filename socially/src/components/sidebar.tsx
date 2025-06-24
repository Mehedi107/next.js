import { currentUser } from '@clerk/nextjs/server';
import UnAuthSidebar from './UnAuthSidebar';

export default async function Sidebar() {
  const user = await currentUser();

  if (!user) return <UnAuthSidebar />;

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', user);
  return <div>sidebar content</div>;
}
