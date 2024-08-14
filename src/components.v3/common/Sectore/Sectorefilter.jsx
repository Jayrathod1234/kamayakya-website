import React, { useState } from "react";
import SearchBar from "./Searchbar";
import CheckboxList from "./Checkbox";

const Sectorefilter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} />
      <CheckboxList />
    </div>
  );
};

export default Sectorefilter;
