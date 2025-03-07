"use client";

import Button from "~/components/button";
import Link from "next/link";
import {
  Menu,
  Home,
  Star,
  Clock,
  Trash,
  Cloud,
  Upload,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import { SignInButton, SignedOut, UserButton, SignedIn } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import type { OurFileRouter } from "~/app/api/uploadthing/core";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const [currentFolder, setCurrentFolder] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useRouter();

  const handleopenSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="h-screen bg-background text-foreground">
      <div className="flex flex-col md:flex-row">
        <aside className="hidden p-4 md:block md:w-1/4">
          <div className="flex flex-col items-center justify-start">
            <Button
              name={"JakoDrive"}
              hasLogo={true}
              logo={<Cloud />}
              className="mb-4 bg-primary transition-all"
            />
            <nav className="flex flex-col gap-4 space-y-6">
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
              >
                <Home />
                <span>Home</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
              >
                <Star />
                <span>Starred</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
              >
                <Clock />
                <span>Recents</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
              >
                <Trash />
                <span>Trash</span>
              </Link>
            </nav>
          </div>
        </aside>
        <div className="w-full p-4 md:w-3/4">
          <div className="flex items-center justify-between pb-6">
            <div className="flex w-1/3 md:w-auto">
              <button
                className="block md:hidden"
                onClick={() => handleopenSidebar()}
              >
                <Menu />
              </button>
            </div>
            <h1 className="w-1/3 text-center text-2xl font-bold">
              {props.parents[props.parents.length - 1]?.name && props.parents[props.parents.length - 1]?.name !== "Root" ? props.parents[props.parents.length - 1]?.name : "My Drive"}
            </h1>
            <div className="flex w-1/3 items-center justify-end gap-2">
              <ThemeToggle />
              <div>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
          <div
            className={`fixed left-0 right-0 top-16 z-50 transform bg-background p-4 transition-all duration-300 ease-in-out ${
              isSidebarOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-full opacity-0"
            } md:hidden`}
          >
            <div
              className={`flex flex-col ${isSidebarOpen ? "animate-slide-down" : ""} `}
            >
              <Button
                name={"JakoDrive"}
                hasLogo={true}
                logo={<Cloud />}
                className="mb-4 bg-primary transition-all"
              />
              <nav className="flex flex-col gap-4">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
                >
                  <Home />
                  <span>Home</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
                >
                  <Star />
                  <span>Starred</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
                >
                  <Clock />
                  <span>Recents</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
                >
                  <Trash />
                  <span>Trash</span>
                </Link>
              </nav>
            </div>
          </div>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <div className="pb-6">
            <div className="flex items-center">
              {props.parents.map((folder, index) => (
                <div key={folder.id} className="flex items-center">
                  {index !== 0 && <ChevronRight className="mx-1 h-4 w-4" />}
                  <Link
                    href={`/f/${folder.id}`}
                    className="text-primary hover:text-primary-hover"
                  >
                    {folder.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="grid-row-4 mb-6 grid gap-4 rounded-md bg-sidebar p-4 shadow">
            <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
              <p>Name</p>
              <p className="pr-8">Size</p>
            </div>
            <ul>
              {props.folders.map((folder) => (
                <FolderRow key={folder.id} folder={folder} />
              ))}
              {props.files.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
            </ul>
          </div>
          <UploadButton
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            onUploadError={(err: Error) => {
              console.error(err);
            }}
            input={{
              folderId: props.currentFolderId,
            }}
          />
        </div>
      </div>
    </main>
  );
}
