import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => setSearchQuery(e.target.value)}
        label="Search for sectors"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBar;
