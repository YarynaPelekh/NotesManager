export type NoteType = {
  description: string;
  directoryId: string;
  id: number;
  position: number;
  tags: string;
  title: string;
};

export type TagType = { id: number; name: string };

export type InputNoteValues = {
  title: string;
  description: string;
  tags: string;
};

export type PropsNoteItem = { item: NoteType; children: JSX.Element };
