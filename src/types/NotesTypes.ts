export type NoteType = {
  description: string;
  directoryId: string;
  id: number;
  position: number;
  tags: string;
  title: string;
};

export type PropsNoteItem = { item: NoteType; children: JSX.Element };
