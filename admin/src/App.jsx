/** @format */

import React from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <h1 className="text-3xl font-bold underline">Hello, Admin Panel!</h1>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default App;
