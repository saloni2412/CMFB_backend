import { any } from 'prop-types'
import React from 'react'

export default function AppFooter(props) {
  return (
    <div
      className={
        props.isAdmin !== undefined && !props.isAdmin ? 'footer bg-black pt-90 m-0 borderNone' : 'footer bg-black'
      }
    >
      {props.isAdmin !== undefined && !props.isAdmin ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-contact">
                <h2>Our Head Office</h2>
                <p>
                  <i className="fa fa-map-marker-alt"></i>123 Street, Canada
                </p>
                <p>
                  <i className="fa fa-phone-alt"></i>+012 345 67890
                </p>
                <p>
                  <i className="fa fa-envelope"></i>info@example.com
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-link">
                <h2>Popular Links</h2>
                <a href="/">About Us</a>
                <a href="/">Contact Us</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-link">
                <h2>Useful Links</h2>
                <a href="/">Terms of use</a>
                <a href="/">Privacy policy</a>
                <a href="/">Help</a>
                <a href="/">FAQs</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-newsletter">
                <h2>Newsletter</h2>
                <form>
                  <input className="form-control" placeholder="Email goes here" />
                  <button className="btn btn-custom">Submit</button>
                  <label>Dont worry, we dont spam!</label>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container copyright">
        <div className="row">
          <div className="col-md-12">
            <p>
              &copy; <a href="/">Canada Mobile Food Bank Online</a>, All Right Reserved.
              <span className="ms-1">&copy; 2023</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

AppFooter.propTypes = {
  isAdmin: any,
}
