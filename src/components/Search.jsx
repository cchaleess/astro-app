import { useState } from "react";

function Search() {
  const [value, setValue] = useState("");

  const busqueda = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Search movie: {value}</h1>
          <form  action= {`/results/${value}`} method="POST" className="d-flex justify-content-center">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={value}
                onChange={busqueda}
              />
              {/* <button className="btn btn-primary" type="submit">Search</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
