import React from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';




class Example extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}




  /**
 * Prints page
 * need to figure out how make it pop up
 */
const printPage = () => {
     const { printPage } = useAuth0();
    return (
        <button
            className="btn btn-danger btn-block"
            onClick={() => printPage()}
            >
                Print
            </button>
    );
};

export default printPage;