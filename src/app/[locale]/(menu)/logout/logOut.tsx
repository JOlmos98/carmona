import { logOut } from '@/lib/actions';

export function LogOutPage() {
  logOut();
  return (
    <div>
      <h1>Log Out</h1>
    </div>
  );
}
