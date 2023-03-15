import React from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const PrintButton = () => {
  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
        />

      </div>
    </>
  )
}


export default PrintButton;