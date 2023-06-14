import { Card, Typography } from "@mui/material";

const Note = () => {
    return (
        <Card
            elevation={5}
            sx={{ p: 2, height: Math.floor((Math.random() + 0.5) * 100) }}
        >
            <Typography variant="h4">Note Title</Typography>
        </Card>
    );
};
export default Note;
