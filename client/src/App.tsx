import Container from "@mui/material/Container";
import NoteContainer from "./components/NoteContainer";
import ActionMenu from "./components/ActionMenu";
import TopAppBar from "./components/TopAppBar";
import { useEffect, useMemo, useState } from "react";
import { Note } from "./types";
import { ME } from "./utils/queries.js";
import LoginModal from "./components/LoginModal";
import auth from "./utils/auth.js";
import { useQuery } from "@apollo/client";

// https://paol-imi.github.io/muuri-react/

// const LOREM =
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi similique natus necessitatibus, corrupti suscipit minus fugiat tenetur perspiciatis quae, harum in? Repellendus possimus vero voluptas dolorum modi nostrum debitis nesciunt expedita eum quaerat quasi inventore alias, consectetur veniam ab dignissimos corrupti hic eveniet soluta incidunt quod, officia maxime nobis. Ullam!";

// const FAKE_NOTES: Note[] = [];

// for (let i = 0; i < 15; i++) {
//     const note = {
//         id: String(i),
//         title: "Note " + i,
//         body: LOREM.split(" ")
//             .splice(0, Math.floor(Math.random() * 50))
//             .join(" "),
//     };
//     FAKE_NOTES.push(note);
// }

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
    }
    return;
};

const App = () => {
    const { data, loading } = useQuery(ME);
    const notes: Note[] = useMemo(() => data?.me.notes || [], [data]);
    const [displayNotes, setDisplayNotes] = useState<Note[]>([]);

    // const [notes, setNotes] = useState<Note[]>(FAKE_NOTES);
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
            <Container
                maxWidth="lg"
                sx={{ p: 5, display: "flex", justifyContent: "center" }}
            >
                {loading ? (
                    <div>loading...</div>
                ) : (
                    <NoteContainer notes={displayNotes} />
                )}
                <ActionMenu
                    onSort={sortNotes}
                    onSearch={searchNotes}
                />
            </Container>
            <LoginModal open={!auth.loggedIn()} />
        </>
    );
};

export default App;
