import React from "react";

export default function NoteItem(props) {
  const { note } = props;
  return (
    <div className="col-md-4 my-3">
      <div class="card" style={{backgroundColor:" var(--bs-primary-bg-subtle)"}}>
        <div class="card-body">
        <button className="btn btn-warning float-end"><i class="fa-regular fa-pen-to-square"></i></button>
          <h4 class="card-title">{note.title}</h4>
          
          <p class="card-text">{note.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste culpa dignissimos, nulla quos voluptas quidem ipsum eum, minus, delectus quaerat numquam. Quam veritatis soluta aliquam praesentium, distinctio cum alias natus.</p>
          <button className="btn-danger btn"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    </div>
  );
}
