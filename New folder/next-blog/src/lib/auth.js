import { cookies } from 'next/headers';
import { decrypt } from './session';

export default async function getSessionToken() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) return null;

  const user = await decrypt(session);
  return user;
}
