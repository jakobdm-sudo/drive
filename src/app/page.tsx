"use client";

import Button from "~/components/button";
import Link from "next/link";
import {
  Folder,
  File,
  Home,
  Star,
  Clock,
  Trash,
  Cloud,
  Upload,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "~/components/theme-toggle"

type FileItem = {
  id: number;
  name: string;
  type: "file";
  size: string;
};

type FolderItem = {
  id: number;
  name: string;
  type: "folder";
  items: number;
  children: FileItem[];
};

type Item = FileItem | FolderItem;

const mockData: Item[] = [
  {
    id: 1,
    name: "Documents",
    type: "folder",
    items: 3,
    children: [
      {
        id: 101,
        name: "Report.pdf",
        type: "file",
        size: "3.5MB",
      },
      {
        id: 102,
        name: "Book.pdf",
        type: "file",
        size: "31.2MB",
      },
      {
        id: 103,
        name: "Notes.txt",
        type: "file",
        size: "1.2MB",
      },
    ],
  },
  {
    id: 2,
    name: "Images",
    type: "folder",
    items: 2,
    children: [
      {
        id: 201,
        name: "Photo.png",
        type: "file",
        size: "1.2MB",
      },
      {
        id: 202,
        name: "Photo2.jpg",
        type: "file",
        size: "3.2MB",
      },
    ],
  },
  {
    id: 3,
    name: "music.mp3",
    type: "file",
    size: "2.2MB",
  },
  {
    id: 4,
    name: "music2.mp3",
    type: "file",
    size: "3.2MB",
  },
];

export default function HomePage() {
  const [currentFolder, setCurrentFolder] = useState<number | null>(null);

  const [breadcrumbs, setBreadcrumbs] = useState<
    Array<{ id: number | null; name: string }>
  >([{ id: null, name: "My Drive" }]);

  const handleOpen = (folderId: number, folderName: string) => {
    setCurrentFolder(folderId);
    setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const crumb = breadcrumbs[index];
    if (!crumb) return;
    setCurrentFolder(crumb.id ?? null);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const currentItems: Item[] = currentFolder
    ? (mockData.find((item) => item.id === currentFolder) as FolderItem)
        ?.children || []
    : mockData;

  return (
    <main className="h-screen bg-background text-foreground">
      <div className="flex flex-row">
        <aside className="w-1/4 p-4">
          <Button
            name="JakoDrive"
            hasLogo={true}
            logo={<Cloud />}
            className="mb-4"
          ></Button>
          <nav className="space-y-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
            >
              <Home />
              Home
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
            >
              <Star />
              Starred
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
            >
              <Clock />
              Recents
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-2 py-3 text-sm transition-colors hover:bg-secondary"
            >
              <Trash />
              Trash
            </Link>
          </nav>
        </aside>
        <div className="w-3/4 p-4">
          <div className="flex items-center justify-between pb-6">
            <h1 className="text-2xl font-bold">My Drive</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                name="Upload"
                hasLogo={true}
                logo={<Upload />}
                className="bg-secondary hover:bg-accent"
              />
            </div>
          </div>
          <div className="pb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="inline-flex items-center">
                  {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
                  <button
                    className="text-blue-500 hover:text-blue-400"
                    onClick={() => handleBreadcrumbClick(index)}
                  >
                    {crumb.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid-row-4 grid gap-4 rounded-md bg-sidebar p-4 shadow">
            <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
              <p className="">Name</p>
              <p className="pr-8">Size</p>
            </div>
            <ul>
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
                  onClick={() =>
                    item.type === "folder"
                      ? handleOpen(item.id, item.name)
                      : null
                  }
                >
                  <div className="flex items-center gap-2">
                    {item.type === "folder" ? (
                      <Folder className="text-primary" />
                    ) : (
                      <File className="text-muted-foreground" />
                    )}
                    {item.name}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {item.type === "folder" ? item.items + " items" : item.size}
                    <button>
                      <MoreVertical className="text-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
