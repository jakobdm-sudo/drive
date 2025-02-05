import { type FileItem, type FolderItem } from "~/lib/mock-data";
import Link from "next/link";
import { Folder, File, MoreVertical } from "lucide-react";
import type { files, folders } from "~/server/db/schema";

export function FileRow(props: { file: typeof files.$inferSelect }) {
  return (
    <div
      key={props.file.id}
      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
    >
      <div className="flex items-center gap-2">
        <a
          href={props.file.url}
          className="flex items-center text-gray-100 hover:text-blue-400"
          target="_blank" //opens in new tab
        ></a>
        <File className="text-muted-foreground" />
        {props.file.name}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {props.file.size}
        <button>
          <MoreVertical className="text-foreground" />
        </button>
      </div>
    </div>
  );
}

export function FolderRow(props: { folder: typeof folders.$inferSelect }) {
  return (
    <Link
      href={`/f/${props.folder.id}`}
      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
    >
      <div className="flex items-center gap-2">
        <Folder className="text-primary" />
        {props.folder.name}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {/* props.folder.items + " items" */}
        <button>
          <MoreVertical className="text-foreground" />
        </button>
      </div>
    </Link>
  );
}
