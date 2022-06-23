export type DirectoryType = {
  id: number;
  name: string;
  parentId: string;
};

export type PropsDirectoryItem = { item: DirectoryType; children: JSX.Element };
