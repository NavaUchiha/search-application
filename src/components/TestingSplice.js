import React, { useState } from "react";

export const TestingSplice = () => {
  let elementsArrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let splicedElementsArray = elementsArrays.splice(0, 2);

  const [dummy, setDummy] = useState("true");
  const deleteHandler = () => {
    let splicedElementsArray1 = elementsArrays.splice(0, 2);
    console.log(elementsArrays.toString());
    setDummy(!dummy);
  };

  return (
    <React.Fragment>
      <div>
        Element array has {elementsArrays.toString()}
        <br />
        Spliced Element array has {splicedElementsArray.toString()}
        <br />
        <input type="submit" onClick={deleteHandler} value="delete" />
      </div>
    </React.Fragment>
  );
};
