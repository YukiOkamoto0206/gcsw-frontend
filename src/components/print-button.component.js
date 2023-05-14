import React from "react";

/**
    prints the page when button is linked
 */

const Print = () =>{     
    console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents; 
  }

  export default Print;