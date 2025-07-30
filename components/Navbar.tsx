import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Logo from "./Logo";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div>
      <header className="flex justify-between items-center gap-4 px-12 border-b h-16">
        <Logo>Legal Case Management System</Logo>

        <SignedOut>
          <SignInButton>
            <Button className="bg-blue-900 hover:bg-blue-950 cursor-pointer">
              Login
            </Button>
          </SignInButton>
          {/* <SignUpButton>
            <button className="bg-[#6c47ff] px-4 sm:px-5 rounded-full h-10 sm:h-12 font-medium text-ceramic-white text-sm sm:text-base cursor-pointer">
              Sign Up
            </button>
          </SignUpButton> */}
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
};

export default Navbar;
