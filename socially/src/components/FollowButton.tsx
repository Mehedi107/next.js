'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';
import { toggleFollow } from '@/actions/user.action';
import toast from 'react-hot-toast';

export default function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleFollow() {
    try {
      setIsLoading(true);
      await toggleFollow(userId);
      toast.success('User followed successfully');
    } catch (error) {
      toast.error('Error following user');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      size={'sm'}
      variant={'secondary'}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : 'Follow'}
    </Button>
  );
}
