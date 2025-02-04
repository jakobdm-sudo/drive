export type FileItem = {
  id: number;
  name: string;
  type: "file";
  url: string;
  parent: string;
  size: string;
};

export type FolderItem = {
  id: number;
  name: string;
  type: "folder";
  items: number;
  parent: string;
};

export const mockFolders: FolderItem[] = [
  { id: 0, name: "Root", type: "folder", items: 2, parent: "root" },
  { id: 1, name: "Documents", type: "folder", items: 2, parent: "0" },
  { id: 2, name: "Images", type: "folder", items: 2, parent: "0" },
  { id: 3, name: "Vacation24", type: "folder", items: 0, parent: "2" },
];

export const mockFiles: FileItem[] = [
  {
    id: 1,
    name: "Report.pdf",
    type: "file",
    url: "/documents/report.pdf",
    parent: "1",
    size: "1.2MB",
  },
  {
    id: 2,
    name: "Book.png",
    type: "file",
    url: "/documents/book.pdf",
    parent: "1",
    size: "8.2MB",
  },
  {
    id: 3,
    name: "Photo2.jpg",
    type: "file",
    url: "/images/photo2.jpg",
    parent: "2",
    size: "3.2MB",
  },
  {
    id: 4,
    name: "Photo3.jpg",
    type: "file",
    url: "/images/photo3.jpg",
    parent: "2",
    size: "3.2MB",
  },
  {
    id: 5,
    name: "music.mp3",
    type: "file",
    url: "/",
    parent: "0",
    size: "2.2MB",
  },
  {
    id: 6,
    name: "music2.mp3",
    type: "file",
    url: "/",
    parent: "0",
    size: "3.2MB",
  },
];
