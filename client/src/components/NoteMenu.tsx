import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { DELETE_NOTE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { ME } from "../utils/queries";

interface NoteMenuProps {
    id: string;
    onToggleEdit: () => void;
}

const NoteMenu = ({ id, onToggleEdit}: NoteMenuProps) => {
    const [deleteNoteMutation, {reset: deleteReset}] = useMutation(DELETE_NOTE, { refetchQueries: [ME]})

    const deleteNote = async (id: string) => {
        try {
            await deleteNoteMutation({variables: {noteId: id}});
            deleteReset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack direction={"column"}>
            <IconButton size="small" onClick={() => deleteNote(id)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" onClick={onToggleEdit}>
                <EditIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
};
export default NoteMenu;
