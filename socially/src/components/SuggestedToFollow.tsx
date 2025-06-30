import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import FollowButton from './FollowButton';
import { getRandomUser } from '@/actions/user.action';
import Link from 'next/link';

export default async function SuggestedToFollow() {
  const users = await getRandomUser();

  if (users.length === 0) return null;

  console.log(users[0].image);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map(user => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-between "
            >
              <div className="flex items-center gap-3">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage
                      className="rounded-full size-10"
                      src={user.image ?? '/avatar.png'}
                    />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
