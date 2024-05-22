import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { logout } from "../../../redux/features/sellers/sellerLoginSlice";
import { Bounce, toast } from "react-toastify";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [toggleClick, setToggleClick] = useState(false);

  const handleLogout = () => {
    // e.preventDefault();
    console.log("called", "logout");
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(logout());
        // console.log(res, "response");
        localStorage.removeItem("token");
        toast.success("logout successfully", {
          className: "toast-message",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // theme: 'dark',
          transition: Bounce,
        });
        navigate("/seller-login");
      }
    });
  };
  return (
    <>
      <div className="outr_parent_nav">
        <div className="lft_p_nav">
          <div className="sidebar">
            <img
              src={require("../../../assets/images/Sidebar.png")}
              alt="sidebar"
            />
          </div>
          <div className="star">
            <FontAwesomeIcon icon={faStar} size="2xl" />
          </div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="javascript:void(0);">Dashboards</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="javascript:void(0);">Default</a>
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
                <img
                  src={require("../../../assets/images/Text.png")}
                  alt="text"
                />
              </div>
            </form>
          </div>
          <div className="all_r_btn">
            <div className="user_icon">
              <div className="user">
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => setToggleClick(!toggleClick)}
                />
                {toggleClick && (
                  <div className="user_login">
                    <Link to="/signup">Login</Link>
                    <a href="javascript:void(0)">Registration</a>
                    <a href="/update-password">Update Password</a>
                    <Link onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
            </div>
            <div className="dark_light">
              <div className="sun">
                <img
                  src={require("../../../assets/images/sun.png")}
                  alt="sun"
                />
              </div>
            </div>
            <div className="counter">
              <img
                src={require("../../../assets/images/counter_btn.png")}
                alt="counter"
              />
            </div>
            <div className="notification">
              <img
                src={require("../../../assets/images/bell.png")}
                alt="bell"
              />
            </div>
            <div className="sidebar right_sb">
              <img
                src={require("../../../assets/images/Sidebar.png")}
                alt="sidebar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
