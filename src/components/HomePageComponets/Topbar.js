import React, { useState } from 'react'
import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBug, faEllipsisVertical, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Topbar = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <>
       <div className={toggle ? "outr_parent_nav active" : "outr_parent_nav"}>
        <div className="lft_p_nav">
          <div className="sidebar">
            <img src={require('../../assets/images/Sidebar.png')} alt="sidebar" />
          </div>
          <div className="star">
            <FontAwesomeIcon icon={faStar} size='2xl' />
          </div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="javascript:void(0);">Dashboards</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Default
              </li>
            </ol>
          </nav>
        </div>
        <div className="rgt_p_nav">
          <div className="search_bar">
            <form action="">
              <input
                type="search"
                placeholder="Search"
                className="search_holder"
              />
              <input type="button" className="search-btn" />
              <div className="icon">
                <img src={require('../../assets/images/Text.png')} alt="text" />
              </div>
            </form>
          </div>
          <div className="all_r_btn">
            <div className="dark_light">
              <div className="sun">
                <img src={require('../../assets/images/sun.png')} alt="sun" />
              </div>
            </div>
            <div className="counter">
              <img src={require('../../assets/images/counter_btn.png')} alt="counter" />
            </div>
            <div className="notification" onClick={() => setToggle(!toggle)}>
              <img src={require('../../assets/images/bell.png')} alt="bell" />
            </div>
      
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar
