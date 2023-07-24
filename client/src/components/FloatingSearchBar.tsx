import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { ChangeEventHandler } from "react";

interface FloatingSearchBarProps {
    onSearch: (search: string) => void;
}

const SearchBar = styled(Paper)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    height: 56,
}));

const FloatingSearchBar = ({ onSearch }: FloatingSearchBarProps) => {
    let searchTimeout: number | null = null;

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (searchTimeout != null) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(
            onSearch.bind(null, event.target.value.toLowerCase()),
            250
        );
    };

    return (
        <SearchBar>
            <Input
                disableUnderline={true}
                fullWidth={true}
                placeholder="Search..."
                sx={{ color: "primary.contrastText" }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: "primary.contrastText" }} />
                    </InputAdornment>
                }
                onChange={handleChange}
            />
        </SearchBar>
    );
};
export default FloatingSearchBar;
