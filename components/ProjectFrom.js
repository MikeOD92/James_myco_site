import React, { useRef } from "react";

export default function ProjectFrom() {
  const title = useRef();
  const body = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
    console.log(body.current.value);
    console.log(title.current.value);
    // for (let i in e.target) {
    //   console.log(e.target[i].value);
    // }

    /*// this if we want to use, the values as an array of text, might want to use a package like formik.
     i think I also need to think about how to layout and show the projects. 
     this would make it easier for a variable number of paragraphs per project but, 
     what about just using      <p style={{ whiteSpace: "pre-wrap" }}> and just making it one big text area input 
     I think this is better its at least more simple. 
     
     
     */
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="p-2">Title</label>
        <input className="p-2" type="text" ref={title} />
        <br />
        <label className="p-2">Body</label>
        <textarea className="p-2" ref={body} cols="50" rows="25" />
        <label className="p-2">Image Upload</label>
        <br />
        <input className="p-2" type="file" />
        <br />
        <input className="p-2 bg-green-600" type="submit" value="POST" />
      </form>
    </div>
  );
}
