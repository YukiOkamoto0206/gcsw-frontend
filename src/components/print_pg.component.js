import React from "react";
import { useReactToPrint } from 'react-to-print';
 
import { ComponentToPrint } from './ComponentToPrint';
 
const  PrintPage= () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};



export default PrintPage;