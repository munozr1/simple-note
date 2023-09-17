import Container from "@mui/material/Container";
import NoteContainer from "./components/NoteContainer";
import ActionMenu from "./components/ActionMenu";
import TopAppBar from "./components/TopAppBar";
import { useEffect, useMemo, useState } from "react";
import { Note } from "./types";
import { ME } from "./utils/queries.js";
import Login from "./components/Login";
import auth from "./utils/auth.js";
import { useQuery } from "@apollo/client";

const getSortFunction = (sort: string) => {
    switch (sort) {
        case "AZ":
            return (a: Note, b: Note) => {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            };
            break;
        case "ZA":
            return (a: Note, b: Note) => {
                if (a.title > b.title) {
                    return -1;
                }
                if (a.title < b.title) {
                    return 1;
                }
                return 0;
            };
            break;
        case "CAT":

        break;
    }
    return;
};

const App = () => {
    const { data, loading } = useQuery(ME);
    const notes: Note[] = useMemo(() => data?.me.notes || [], [data]);
    const [displayNotes, setDisplayNotes] = useState<Note[]>([]);

    useEffect(() => {
        setDisplayNotes(notes);
    }, [notes]);

    const sortNotes = (sort: string) => {
        const sortedNotes = [...notes];
        sortedNotes.sort(getSortFunction(sort));

        setDisplayNotes(sortedNotes);
    };

    const searchNotes = (search: string) => {
        let searchedNotes = [...notes];
        searchedNotes = searchedNotes.filter((note) => {
            if (note.title.toLowerCase().includes(search)) {
                return true;
            }
            if (note.body.toLowerCase().includes(search)) {
                return true;
            }
            return false;
        });

        setDisplayNotes(searchedNotes);
    };

    return (
        <>
            <TopAppBar />
            {auth.loggedIn() ? (
                <Container
                    maxWidth="lg"
                    sx={{ p: 5, display: "flex", justifyContent: "center" }}
                >
                    {loading ? (
                        <div>loading...</div>
                    ) : (
                        <NoteContainer notes={displayNotes} />
                    )}
                    <ActionMenu onSort={sortNotes} onSearch={searchNotes} />
                </Container>
            ) : (
                <Login />
            )}
        </>
    );
};

export default App;
