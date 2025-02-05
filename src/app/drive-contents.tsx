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
import { useState, useMemo } from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { FileRow, FolderRow } from "./file-row";
import type { files, folders } from "~/server/db/schema";

export default function DriveContents(props: {
  files: typeof files.$inferSelect[];
  folders: typeof folders.$inferSelect[];
}) {
  const [currentFolder, setCurrentFolder] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const breadcrumbs = useMemo(() => {
    // Array to store the folder path from root to current location
    const crumbs = [];
    // Start with the current folder's ID (e.g., if we're in "Vacation24", this is "3")
    let currentId = currentFolder;

    // Keep going until we reach the root folder (id: "0")
    while (currentId !== 1) {
      // Find the current folder object by its ID
      const folder = props.folders.find(
        (folder) => folder.id === currentId,
      );

      if (folder) {
        // Add the folder to the START of the array
        // This maintains the correct order: root -> subfolder -> current
        crumbs.unshift(folder);

        // Move up one level by setting currentId to this folder's parent
        // e.g., from "Vacation24" (parent:"2") to "Images" (parent:"0")
        currentId = folder.parent ?? 1;
      } else {
        break;
      }
    }
    // Returns array of folders representing the path
    // e.g., [Images, Vacation24] for path: My Drive > Images > Vacation24
    return crumbs;
  }, [currentFolder, props.folders]); // Recalculate only when currentFolder changes

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
            <button
              className="block md:hidden"
              onClick={() => handleopenSidebar()}
            >
              <Menu />
            </button>
            <h1 className="text-2xl font-bold">My Drive</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                name="Upload"
                hasLogo={true}
                logo={<Upload />}
                className="bg-primary hover:bg-primary-hover"
              />
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
              <Link
                href="/f/0"
                className="text-primary hover:text-primary-hover"
              >
                My Drive
              </Link>
              {breadcrumbs.map((folder) => (
                <div key={folder.id} className="flex items-center">
                  <ChevronRight className="mx-1 h-4 w-4" />
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
          <div className="grid-row-4 grid gap-4 rounded-md bg-sidebar p-4 shadow">
            <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
              <p>Name</p>
              <p className="pr-8">Size</p>
            </div>
            <ul>
              {props.folders.map((folder) => (
                <FolderRow
                  key={folder.id}
                  folder={folder}
                />
              ))}
              {props.files.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
