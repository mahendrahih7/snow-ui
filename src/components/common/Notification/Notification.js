import React, { useState } from 'react'
import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBug, faEllipsisVertical, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Notification = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className={toggle ? "right_notifictaion active" : "right_notifictaion"}>
      <div className="outr_notifictaion">
        <div className="outr_notifictaion">
          <div className="innr_top">
            <div className="ntfcn_hdr">
              <h6>Notifications</h6>
            </div>
            <div className="ntfcn_divs">
              <div className="ntfcn_div">
                <div className="nt_icn">
                  <span>
                  <FontAwesomeIcon icon={faBug} />
                  </span>
                </div>
                <div className="nt_txt">
                  <h6>You fixed a bug.</h6>
                  <p>Just now</p>
                </div>
              </div>
              <div className="ntfcn_div">
                <div className="nt_icn">
                  <span>
                  <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
                <div className="nt_txt">
                  <h6>New user registered.</h6>
                  <p>59 minutes ago</p>
                </div>
              </div>
              <div className="ntfcn_div">
                <div className="nt_icn">
                  <span>
                  <FontAwesomeIcon icon={faBug} />
                  </span>
                </div>
                <div className="nt_txt">
                  <h6>You fixed a bug.</h6>
                  <p>12 hours ago</p>
                </div>
              </div>
              <div className="ntfcn_div">
                <div className="nt_icn">
                  <span>
                  <FontAwesomeIcon icon={faTowerBroadcast} />
                  </span>
                </div>
                <div className="nt_txt">
                  <h6>Andi Lane subscribed to you.</h6>
                  <p>Today, 11:59 AM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="innr_ordr">
            <div className="orde-hdr">
              <h6>Online Orders</h6>
              <h6>
                Rs - <span>230</span> - zomato - 10 min
              </h6>
            </div>
            <div className="order_btns">
              <div className="btn">
                <a href="javascript:void(0);">Cooking</a>
              </div>
              <div className="btn">
                <a href="javascript:void(0);">Delivered</a>
              </div>
            </div>
          </div>
          <div className="innr_tbl_bkn">
            <div className="orde-hdr">
              <h6>Table Bookings</h6>
              <h6>26 Dec Manish Sethia 7:30 pm</h6>
            </div>
            <div className="order_btns tbl">
              <div className="btn">
                <span>
                  <i className="fa-solid fa-check" />
                </span>
                <a href="javascript:void(0);">Approve</a>
              </div>
              <div className="btn">
                <span>
                  <i className="fa-solid fa-xmark" />
                </span>
                <a href="javascript:void(0);">Decline</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Notification
