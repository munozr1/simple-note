import NoteItem from "./NoteItem";
import { Masonry } from "@mui/lab";
import { Note } from "../types";

interface NoteContainerProps {
    notes: Note[];
}

const NoteContainer = ({ notes }: NoteContainerProps) => {
    return (
        <Masonry columns={{ xs: 1, md: 2, lg: 4 }} spacing={0}>
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}
        </Masonry>
    );
};
export default NoteContainer;
