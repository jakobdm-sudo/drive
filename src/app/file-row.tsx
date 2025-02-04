import { type FileItem, type FolderItem } from "~/lib/mock-data";
import Link from "next/link";
import { Folder, File, MoreVertical } from "lucide-react";

interface ItemRowProps {
  item: FolderItem;
  handleOpen: (id: number, name: string) => void;
}

export function FileRow({ item }: { item: FileItem }) {
  return (
    <div
      key={item.id}
      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
    >
      <div className="flex items-center gap-2">
        <a
          href={item.url}
          className="flex items-center text-gray-100 hover:text-blue-400"
          target="_blank" //opens in new tab
        ></a>
        <File className="text-muted-foreground" />
        {item.name}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {item.size}
        <button>
          <MoreVertical className="text-foreground" />
        </button>
      </div>
    </div>
  );
}

export function FolderRow({ item, handleOpen }: ItemRowProps) {
  return (
    <div
      key={item.id}
      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
      onClick={() => handleOpen(item.id, item.name)}
    >
      <div className="flex items-center gap-2">
        <Link
          href={`/folder/${item.id}`}
          className="flex items-center text-gray-100 hover:text-blue-400"
        ></Link>
        <Folder className="text-primary" />
        {item.name}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {item.items + " items"}
        <button>
          <MoreVertical className="text-foreground" />
        </button>
      </div>
    </div>
  );
}
