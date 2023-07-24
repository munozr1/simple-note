import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import { useState } from "react";

interface FilterButtonProps {
    onSort: (sort: string) => void
}

const FilterButton = ({onSort}: FilterButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClick}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <FilterListIcon />
                <Typography>Sort</Typography>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <MenuItem
                    onClick={() => {
                        typeof onSort
                        onSort("AZ")
                        handleClose();
                    }}
                >
                    Name (A-Z)
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        onSort("ZA")
                        handleClose();
                    }}
                >
                    Name (Z-A)
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        console.log("Date Updated");
                        handleClose();
                    }}
                >
                    Date Updated
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        console.log("Date Created");
                        handleClose();
                    }}
                >
                    Date Created
                </MenuItem>
            </Menu>
        </>
    );
};
export default FilterButton;
