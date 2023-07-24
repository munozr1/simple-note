import { Button, Stack } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import FloatingSearchBar from "./FloatingSearchBar";
import FilterButton from "./FilterButton";
import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../utils/mutations";
import { ME } from "../utils/queries";

interface ActionMenuProps {
    onSort: (sort: string) => void;
    onSearch: (search: string) => void;
}

const ActionMenu = ({ onSort, onSearch }: ActionMenuProps) => {
    const [addNoteMutation, { reset: addReset }] = useMutation(ADD_NOTE, {
        variables: { title: "New note", body: "notes on stuff..." },
        refetchQueries: [ME],
    });

    const addNote = async () => {
        try {
            await addNoteMutation();
            addReset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                position: "fixed",
                bottom: 32,
            }}
        >
            <FilterButton onSort={onSort} />
            <FloatingSearchBar onSearch={onSearch} />
            <Button variant="contained" onClick={addNote}>
                <AddIcon />
            </Button>
        </Stack>
    );
};
export default ActionMenu;
