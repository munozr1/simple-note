import { Note } from "../types";
import { Typography, Box, Card, TextField, Stack } from "@mui/material";
import NoteMenu from "./NoteMenu";
import { ChangeEventHandler, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTE } from "../utils/mutations";

interface NoteProps {
    note: Note;
}

interface NoteInput extends HTMLInputElement {
    name: "title" | "body";
}

const NoteItem = ({ note }: NoteProps) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [noteText, setNoteText] = useState<Note>(note);
    const [updateNote, { reset: resetUpdate }] = useMutation(UPDATE_NOTE);

    const toggleEdit = async () => {
        if (editing) {
            await updateNote({
                variables: {
                    noteId: note._id,
                    title: noteText.title,
                    body: noteText.body,
                },
            });
            resetUpdate();
        }
        setEditing((prevState) => !prevState);
    };

    const onInputChange: ChangeEventHandler<NoteInput> = (event) => {
        setNoteText((prevState) => {
            const note = { ...prevState };
            note[event.target.name] = event.target.value;
            return note;
        });
    };

    return (
        <Box sx={{ p: 1 }}>
            <Card elevation={5} sx={{ p: 2 }} variant={editing ? "dip" : "pop"} >
                <Box display="flex" flexDirection="row">
                    <Box flexGrow={1}>
                        {editing ? (
                            <Stack gap={1}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={noteText.title}
                                    onChange={onInputChange}
                                />
                                <TextField
                                    label="Body"
                                    name="body"
                                    value={noteText.body}
                                    onChange={onInputChange}
                                    multiline
                                    minRows={1}
                                    maxRows={10}
                                    placeholder="Enter Text"
                                />
                            </Stack>
                        ) : (
                            <>
                                <Typography variant="h5" marginBottom={2}>
                                    {noteText.title}
                                </Typography>
                                <Typography variant="body2">
                                    {noteText.body}
                                </Typography>
                            </>
                        )}
                    </Box>
                    <NoteMenu onToggleEdit={toggleEdit} id={note._id} />
                </Box>
            </Card>
        </Box>
    );
};
export default NoteItem;
