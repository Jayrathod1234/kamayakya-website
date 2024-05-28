"use client";
import Image from "next/image";
import React from "react";
import { Avatar } from "./avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components.v2/ui/sheet";

export function Navbar() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div className=" flex py-2 md:py-4 justify-between items-center">
      <div className=" flex ">
        <Sheet>
          <SheetTrigger>
            <Image
              className="inline-block md:hidden"
              src="/icons/hamburger.svg"
              alt="hamburger-icon"
              width={24}
              height={24}
              priority
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Image
          className=" inline-block md:hidden"
          src="/KKLogo.png"
          alt="KamayaKya-logo"
          width={125}
          height={36}
          priority
        />
        <Image
          className=" hidden md:inline-block"
          src="/KKLogo.png"
          alt="KamayaKya-logo"
          width={197}
          height={56}
          priority
        />
      </div>
      <div className="flex flex-1 justify-center items-center">
        <ul className=" hidden md:flex gap-x-9 m-0 *:m-0 ">
          <li>
            <Link className="!text-gray-500 !font-normal" href="/">
              About us{" "}
            </Link>
          </li>
          <li>
            <Link
              className={`${router.pathname === "/pricing" ? "!text-brand-400" : "!text-gray-500"} !font-normal`}
              href="/pricing"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link className="!text-gray-500 !font-normal" href="/">
              SME Corner
            </Link>
          </li>
          <li>
            <Link className="!text-gray-500 !font-normal" href="/">
              Stock Prices{" "}
            </Link>
          </li>
        </ul>
      </div>
      <div className=" px-2">
        <Avatar />
      </div>
    </div>
  );
}
