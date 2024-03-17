import React from 'react';
import { Link } from 'react-router-dom';
import './FooterScreen.css';

function FooterScreen() {
    return (
        <div>
             <hr></hr>
            <div className="d-flex flex-row mb-3">
  <div class="p-2">AirBnB</div></div>
            <hr></hr>
            <div className="d-flex justify-content-around">
                <div className="p-2">
                    <div className="d-flex flex-column mb-3">
                        <div className="p-2"><h6>Support</h6></div>
                        <div className="p-2"><Link to="https://www.airbnb.co.in/help" className="gray-link">Help center</Link>  </div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">AirCover</Link> </div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Anti-discrimination</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Disability support</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Cancellation options</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Report neighbourhood concern</Link></div>

                    </div>
                </div>
                <div classNamess="p-2">
                    <div className="d-flex flex-column mb-3">
                        <div className="p-2"><h5>Hosting</h5></div>
                        <div className="p-2"><Link to="/home" className="gray-link">Airbnb your home</Link> </div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">AirCover for Hosts</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Hosting resources</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Community forum</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Hosting responsibly</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Join a free Hosting class</Link></div>
                    </div>
                </div>
                <div className="p-2">
                    <div className="d-flex flex-column mb-3">
                        <div className="p-2"><h5>Airbnb</h5></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Newsroom</Link> </div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">New features</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Careers</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Investors</Link></div>
                        <div className="p-2"><Link to="/Aircover" className="gray-link">Airbnb.org emergency stays</Link></div>

                    </div>
                </div>
                {/* <hr></hr> */}
            </div>
            <hr></hr>
            <div className="d-flex justify-content-between m-2">
                <div className="">© 2024 Airbnb, Inc. · Privacy ·  Terms · Sitemap · Company details</div>
                <div className=""><i class="fa-solid fa-globe"></i>  English(IN)   <span>INR <i class="fa-brands fa-facebook-f"></i> <i class="fa-brands fa-instagram"></i> <i class="fa-brands fa-whatsapp"></i></span> </div>
            </div>

        </div>
    );
}

export default FooterScreen;
