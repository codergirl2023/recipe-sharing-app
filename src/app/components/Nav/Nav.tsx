'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import logoPic from '@/app/assets/icons/logo.svg';
import UserNotLogged from './UserNotLogged';

const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleToggle = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSignOutClick = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(`Failed to sign out, ${error}`);
    }
  };

  return (
    <nav className="flex flex-between w-full mb-5 mt-5">
  <Link href="/" className="" data-cy="back-to-home-btn">
    <Image src={logoPic} width={36} height={36} className="rounded-full" alt="logo" />
    <p className="logo_text sm:block hidden">Cook's Compass</p>
  </Link>
  <div className="flex items-center justify-end" style={{ width: "100%" }}>
    {session?.user ? (
      <div className="flex items-center justify-end">
        <Link href="/create-recipe" className="black_btn mr-4" data-cy="link-to-create-recipe">
          Create new recipe
        </Link>
        <Link href="/profile" className="black_btn mr-4" data-cy="profile-btn">
          Profile
        </Link>
        <button type="button" onClick={handleSignOutClick} className="outline_btn" data-cy="logout-btn">
          Sign out
        </button>
      </div>
    ) : (
      <div className="flex-end">
        <UserNotLogged />
      </div>
    )}
  </div>
</nav>


  );
};

export default Nav;
