import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>Search</button>
        <p>Search value: {search}</p>
    </div>
  );
}

export default Search;