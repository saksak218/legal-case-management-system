import { Inconsolata } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const inconsolata = Inconsolata({
  subsets: ["latin"],
});

const Logo = ({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames: string;
}) => {
  return (
    <Link href={"/"} className="flex items-center gap-x-2">
      <Image src="/logo/logo.png" width={40} height={40} alt="Logo" />
      <p
        className={`${inconsolata.className} font-bold text-blue-900  ${classNames}`}
      >
        {children}
      </p>
    </Link>
  );
};

export default Logo;
