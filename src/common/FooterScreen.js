import React from 'react';
import { Link } from 'react-router-dom';
import './FooterScreen.css';

function FooterScreen() {
    return (
        <div>
            {/* <div className=' p-4'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14200.999659475168!2d78.39559795!3d27.148426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m3!3e6!4m0!4m0!5e0!3m2!1sen!2sin!4v1708750241778!5m2!1sen!2sin" width="100%" height="450" style={{border:"0;"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div> */}
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
