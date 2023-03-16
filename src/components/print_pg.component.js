import React from "react";
import ReactToPrint from "react-to-print";

const PrintButton = () => {
  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button
                        className="btn btn-primary btn-block">
                        Print this out!
                        </button>}
        />

      </div>
    </>
  )
};


export default PrintButton;