import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="p-20">
      <SignedOut>
        <SignInButton>
          <Button>Sing in</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sing up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
