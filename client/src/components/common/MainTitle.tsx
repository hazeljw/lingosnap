import React from "react";

function MainTitle({size}:{size?:string}) {

  const small = size === 'small';


  return (
    <div className={small ? "main-title-small" : "main-title"}>
      <div className="title-word">
        <div className="title-letter">L</div>
        <div className="title-letter">i</div>
        <div className="title-letter">n</div>
        <div className="title-letter">g</div>
        <div className="title-letter">o</div>
      </div>
      <div className="title-word">
        <div className="title-letter">S</div>
        <div className="title-letter">N</div>
        <div className="title-letter">A</div>
        <div className="title-letter">P</div>
      </div>
    </div>
  );
}

export default MainTitle;