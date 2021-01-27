import React from "react";
import QRCode from "qrcode.react"

function Qrcode({usn}){
    return(
    <div style = {{height: "200px", width: "200px",alignContent:"center"}}> 
        <QRCode
            style={{height: "200px", width: "200px",marginLeft:"64%"}}
             value={usn}
            //value="hello"
            renderAs="svg"
            level= "H"
            fgColor="#333"
            bgColor="#fff"
        />
    </div>
    )
}

export default Qrcode;