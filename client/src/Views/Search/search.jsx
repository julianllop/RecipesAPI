import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../Redux/actions";
import styles from "./search.module.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Divider, InputBase, Paper } from "@mui/material";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [input, setInput] = useState(name);

    function handleInputChange(event) {
        setInput(setName(event.target.value));
        console.log(name);
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getByName(name));
        setInput("");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                // flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                maxWidth: "50%",
                paddingRight: "10px",
            }}
        >
            <Paper
                component="form"
                sx={{
                    background: "transparent",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "500px",
                    height: "30px",
                    border: "solid 1px #8e1300",
                    borderRadius: "25px",
                    paddingLeft: "10px",
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, color: "#390800", width: "100%" }}
                    variant="standard"
                    placeholder="Search:"
                    color="primary"
                    inputProps={{ "aria-label": "search a product" }}
                    onChange={handleInputChange}
                    value={input}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    component="button"
                    type="submit"
                    sx={{ p: "10px", color: "#8e1300" }}
                    aria-label="search"
                    onClick={handleSubmit}
                    onKeyPress={handleKeyPress}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
}
