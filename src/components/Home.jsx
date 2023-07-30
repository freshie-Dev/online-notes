import React from "react";
import Notes from "./Notes";

export default function Home() {

  return (
    <div className="row">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title..."
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Description..."
          ></textarea>
          <button className="btn-success btn my-2">Add</button>
        </div>
      </form>
      <Notes/>
    </div>
  );
}
