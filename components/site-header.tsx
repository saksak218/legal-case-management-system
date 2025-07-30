import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Logo from "./Logo";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center gap-1 lg:gap-2 px-4 lg:px-6 w-full">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* <h1 className="font-medium text-base"></h1> */}
        <Logo classNames="text-lg">Legal Case Management System</Logo>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
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
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
