"use client";

import Link from "next/link";
import { Folder, File, MoreVertical, StarIcon } from "lucide-react";
import type { files_table, folders_table } from "~/server/db/schema";
import FileMenu from "~/components/file-menu";
import FolderMenu from "~/components/folder-menu";
import { useState } from "react";

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} bytes`;
  }
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export function FileRow(props: {
  file: typeof files_table.$inferSelect & {
    isStarred?: boolean | null;
  };
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isStarred, setIsStarred] = useState(props.file.isStarred ?? false);

  // if file is deleted, don't render the row (optimistic delete)
  if (isDeleted) return null;

  return (
    <div
      key={props.file.id}
      className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors ${
        isMenuOpen ? "bg-secondary" : "hover:bg-secondary"
      }`}
    >
      <div className="flex items-center gap-2">
        <a
          href={props.file.url}
          className="flex items-center gap-2 text-foreground hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <File className="text-muted-foreground" />
          {props.file.name}
        </a>
        {isStarred && <StarIcon className="h-4 w-4 fill-yellow-500" />}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {formatFileSize(props.file.size)}
        <FileMenu
          file={props.file}
          fileId={props.file.id}
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          onDelete={() => setIsDeleted(true)}
          onStarToggle={() => setIsStarred(!isStarred)}
        />
      </div>
    </div>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // if file is deleted, don't render the row (optimistic delete)
  if (isDeleted) return null;

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors ${
        isMenuOpen ? "bg-secondary" : "hover:bg-secondary"
      }`}
    >
      <Link href={`/f/${props.folder.id}`} className="flex items-center gap-2">
        <Folder className="text-primary" />
        {props.folder.name}
      </Link>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {/* props.folder.items + " items" */}
        <FolderMenu
          folderId={props.folder.id}
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          onDelete={() => setIsDeleted(true)}
        />
      </div>
    </div>
  );
}
