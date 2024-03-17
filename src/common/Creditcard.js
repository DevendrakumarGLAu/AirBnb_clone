import React from 'react'
import './Creditcard.css'

function Creditcard() {
    return (
        <div>
            <div style={{ background: '#212121' }}>
                <div class="container1">
                    <div class="box">
                        <span class="title text-danger">Mastercard</span>
                        <div>
                            <div class="container text-center">
                                <div class="row">
                                    
                                    <div class="col-md-4"><i class="fa-regular fa-credit-card"></i></div>
                                    <div class="col-md-4"><i class="fa-solid fa-wifi"></i></div>
                                </div>
                            </div>
                            <strong>JOE WATSON SBF</strong>
                            <p>1234 987 242 1984</p>
                            <span>VALID &nbsp; UP &nbsp;</span><span>01 / 24</span>  <span>&nbsp;TO &nbsp;01 / 28</span>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default Creditcard;