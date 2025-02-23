export interface FileItem {
  id: string;
  name: string;
  url: string;
  parent: string;
  size: string;
}

export interface FolderItem {
  id: string;
  name: string;
  parent: string | null;
}

export const mockFolders: FolderItem[] = [
  { id: "1", name: "My Drive", parent: null },
  { id: "2", name: "Documents", parent: "1" },
  { id: "3", name: "Images", parent: "1" },
  { id: "4", name: "Work", parent: "2" },
  { id: "5", name: "Presentations", parent: "4" },
];

export const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Resume.pdf",
    url: "/files/resume.pdf",
    parent: "4",
    size: "1MB", // Will be converted to bytes
  },
  {
    id: "2",
    name: "Profile.jpg",
    url: "/files/profile.jpg",
    parent: "3",
    size: "2MB", // Will be converted to bytes
  },
  {
    id: "5",
    name: "Project Proposal.docx",
    url: "/files/proposal.docx",
    parent: "2",
    size: "2.5 MB",
  },
  {
    id: "6",
    name: "Vacation.jpg",
    url: "/files/vacation.jpg",
    parent: "3",
    size: "3.7 MB",
  },
  {
    id: "7",
    name: "Profile Picture.png",
    url: "/files/profile.png",
    parent: "3",
    size: "1.8 MB",
  },
  {
    id: "9",
    name: "Q4 Report.pptx",
    url: "/files/q4-report.pptx",
    parent: "8",
    size: "5.2 MB",
  },
  {
    id: "10",
    name: "Budget.xlsx",
    url: "/files/budget.xlsx",
    parent: "4",
    size: "1.5 MB",
  },
];
