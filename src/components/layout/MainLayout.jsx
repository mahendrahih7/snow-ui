import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
// import Topbar from "../common/Topbar";

import { faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBug,
  faEllipsisVertical,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Topbar from "../HomePageComponets/Topbar";
import Notification from "../common/Notification/Notification";
import HomePage from "../../pages/home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { sellerLogout } from "../../redux/features/sellers/sellerLoginSlice";

import axios from "axios";
import { Seller_logout } from "../../constants/Api/Api";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import swal from "sweetalert";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [toggleClick, setToggleClick] = useState(false);

  const { loading } = useSelector((state) => state.loginSeller);

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
        dispatch(sellerLogout()).then((res) => {
          console.log(res);
          toast.success(res.payload.message, {
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
        });
      }
    });

    // Swal.fire({
    //   title: "Are you sure?",
    //   // text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Logout",
    // }).then((result) => {
    //   dispatch(sellerLogout()).then((res) => {
    //     console.log(res);
    //     toast.success(res.payload.message, {
    //       className: "toast-message",
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       // theme: 'dark',
    //       transition: Bounce,
    //     });
    //     navigate("/seller-login");
    //   });
    // });
  };

  return (
    <>
      {/* <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box> */}

      <main>
        <section className="total_parent_element">
          <div className="left_parent_element">
            <div className="total_upper_left">
              <div className="logo_area" />
              <div className="nav_area">
                <div className="outr_dashboard_nav">
                  <h4>Dashboards</h4>
                  <div className="parent_nav_menu">
                    <Sidebar />
                  </div>
                </div>
              </div>
              <div className="nav_btm_logo">
                <img
                  src={require("../../assets/images/nav_btm_logo.png")}
                  alt="btm-logo"
                />
              </div>
            </div>
          </div>
          <div className="right_parent_element">
            <div
              className={toggle ? "outr_parent_nav active" : "outr_parent_nav"}
            >
              <div className="lft_p_nav">
                <div className="sidebar">
                  <img
                    src={require("../../assets/images/Sidebar.png")}
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
                      <img
                        src={require("../../assets/images/Text.png")}
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
                        src={require("../../assets/images/sun.png")}
                        alt="sun"
                      />
                    </div>
                  </div>
                  <div className="counter">
                    <img
                      src={require("../../assets/images/counter_btn.png")}
                      alt="counter"
                    />
                  </div>
                  <div
                    className="notification"
                    onClick={() => setToggle(!toggle)}
                  >
                    <img
                      src={require("../../assets/images/bell.png")}
                      alt="bell"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <Topbar/> */}
            {/* <div className="outr-right-content">
        <div className="dbrd_ttl">
          <a href="index.html" className="btod_ottr">
            <div className="btod_flx">
              <div className="btod_img">
                <img src={require('../../assets/images/b2d.png')} alt="img" />
              </div>
              <span className="btod_txt"> Back to Dashboard </span>
            </div>
          </a>
          <div className="dbrd_stngs_tab">
            <div className="dbrd_stngs_tb_inr">
              <a href="javascript:void(0);" className="stngs_lft_prt">
                <div className="stngs_lft_flx">
                  <div className="stngs_lft_logo">
                    <div className="stngs_lft_logo_pc">
                      <h5>LOGO</h5>
                    </div>
                  </div>
                  <div className="stngs_lft_logo_txt">
                    <h4>Hih7 Webtech Pvt Ltd</h4>
                  </div>
                </div>
              </a>
              <a href="javascript:void(0);" className="stngs_rght_prt">
                <span>
                <FontAwesomeIcon icon={faEllipsisVertical} size='2xl' />
                </span>
              </a>
            </div>
            <div className="tabs-container">
              <nav className="tabs">
                <ul>
                  <li className="active" data-tab="tab-1">
                    Company Settings
                  </li>
                  <li data-tab="tab-2">Report Settings</li>
                  <li data-tab="tab-3">Table Setup</li>
                  <li data-tab="tab-4">Invoice Settings</li>
                  <li data-tab="tab-5">Loyalty Settings</li>
                  <li data-tab="tab-6">Notification Settings</li>
                  <li data-tab="tab-7">Others Settings</li>
                </ul>
              </nav>
            </div>
            <div id="tab-1" className="tab-content current">
              <div className="tb_cntct_bth">
                <div className="tb_cntct_lft">
                  <div className="tb_cntct_lft_txt">
                    <h6>General</h6>
                    <p>The display name appears on printed receipts.</p>
                  </div>
                </div>
                <div className="tb_cntct_rght">
                  <div className="tb_cntct_rght_form">
                    <form>
                      <div className="tb_cntct_rght_top">
                        <div className="form-group">
                          <label>Company name*</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Display name*</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="tb_cntct_rght_bttm">
                        <div className="form-group">
                          <label>Description of your company</label>
                          <textarea
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="tb_cntct_bth">
                <div className="tb_cntct_lft">
                  <div className="tb_cntct_lft_txt">
                    <h6>Address</h6>
                    <p>
                      Warning: Editing the country will automatically apply
                      default settings for the new country. Your current
                      settings will be lost.
                    </p>
                  </div>
                </div>
                <div className="tb_cntct_rght">
                  <div className="tb_cntct_rght_form">
                    <form>
                      <div className="tb_cntct_rght_top drpn">
                        <div className="form-group">
                          <label>Street name*</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group slct">
                          <label>Number*</label>
                          <select className="form-control">
                            <option value="number">1</option>
                            <option value="number">2</option>
                          </select>
                        </div>
                      </div>
                      <div className="tb_cntct_rght_top drpn">
                        <div className="form-group slct">
                          <label>Postal code*</label>
                          <select className="form-control">
                            <option value="pcode">H2Y 1A6</option>
                            <option value="pcode">H2Y 1A7</option>
                          </select>
                        </div>
                        <div className="form-group slct">
                          <label>City*</label>
                          <select className="form-control">
                            <option value="pcode">Montreal</option>
                            <option value="pcode">Kolkata</option>
                          </select>
                        </div>
                        <div className="form-group slct">
                          <label>Country*</label>
                          <select className="form-control">
                            <option value="pcode">Canada</option>
                            <option value="pcode">India</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="tb_cntct_bth last">
                <div className="tb_cntct_lft">
                  <div className="tb_cntct_lft_txt">
                    <h6>Active</h6>
                  </div>
                  <div className="tb_cntct_lft_chkbx">
                    <form>
                      <div className="frm-grp-ttl">
                        <div className="form-group">
                          <span>
                            <input type="checkbox" name="chk" className="chk" />
                          </span>
                          <span>
                            <label>Restaurant</label>
                          </span>
                        </div>
                        <div className="form-group">
                          <span>
                            <input type="checkbox" name="chk" className="chk" />
                          </span>
                          <span>
                            <label>Online</label>
                          </span>
                        </div>
                        <div className="form-group">
                          <span>
                            <input type="checkbox" name="chk" className="chk" />
                          </span>
                          <span>
                            <label>Web</label>
                          </span>
                        </div>
                        <div className="form-group">
                          <span>
                            <input type="checkbox" name="chk" className="chk" />
                          </span>
                          <span>
                            <label>All</label>
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="tb_cntct_rght bttm">
                  <div className="tb_cntct_rght_form">
                    <form>
                      <div className="tb_cntct_rght_top">
                        <div className="form-group slct">
                          <label>GST</label>
                          <input type="number" className="form-control" />
                          <label>%</label>
                          <span>Changeable</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div id="tab-2" className="tab-content">
              <div className="rprt_stng_ottr">
                <div className="rprt_stng_top">
                  <div className="rprt_stng_top_left">
                    <h5>Report Settings</h5>
                  </div>
                  <div className="rprt_stng_top_rght">
                    <a href="javascript:void(0);" className="sv_btn">
                      Save
                    </a>
                  </div>
                </div>
                <div className="rprt_stng_bttm">
                  <div className="rprt_stng_bttm_innr">
                    <div className="rprt_stng_form">
                      <form>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>Show totals summary</label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>Show receipts overview</label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>
                            Show receipt ID in the receipts overview
                          </label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>Append floor report to day reports</label>
                          <span>
                            When enabled, the day report will contain a total
                            for all floors as well as a breakdown per floor.
                          </span>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>Show users summary</label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>
                            Show the number of payments in payments section
                          </label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>
                            Book receipts on the day the receipt was finalized
                          </label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>Show service charge details</label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>Show 'Cash Due'</label>
                        </div>
                        <div className="rprt_stng_form_innr">
                          <input type="checkbox" name="chk" className="chk" />
                          <label>Show discounts by type/user</label>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="tab-3" className="tab-content" />
            <div id="tab-4" className="tab-content">
              <div className="tab_4_hdr">
                <div className="tab_4_hdr_lft">
                  <h6>Invoice Settings</h6>
                </div>
                <div className="tab_4_hdr_rght">
                  <button>Save</button>
                </div>
              </div>
              <div className="tb_cntct_bth">
                <div className="tb_cntct_lft">
                  <div className="tb_cntct_lft_txt">
                    <h6>Invoice Settings</h6>
                  </div>
                </div>
                <div className="tb_cntct_rght">
                  <div className="tb_cntct_rght_form">
                    <form>
                      <div className="tb4-r-top">
                        <div className="form-group">
                          <label>Bank account numbe</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                          />
                        </div>
                      </div>
                      <div className="tb4-r-mid">
                        <div className="form-group">
                          <label>
                            Prefix invoice number
                            <span>
                              <a href="javascript:void(0);">
                                <i className="fa-solid fa-info" />
                              </a>
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={2023}
                          />
                        </div>
                        <div className="form-group">
                          <label>Days before invoice expires</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={0}
                          />
                        </div>
                      </div>
                      <div className="tb4--btm">
                        <div className="tb_cntct_rght_bttm">
                          <div className="form-group">
                            <label>Invoice terms</label>
                            <textarea
                              className="form-control"
                              rows={10}
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div id="tab-5" className="tab-content" />
            <div id="tab-6" className="tab-content" />
            <div id="tab-7" className="tab-content" />
          </div>
        </div>
      </div> */}
            <div className="outr-right-content">
              {/* <HomePage/> */}
              <Outlet />
            </div>
          </div>
          {/* <Notification/> */}
          <div
            className={
              toggle ? "right_notifictaion active" : "right_notifictaion"
            }
          >
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
        </section>
      </main>
    </>
  );
};

export default MainLayout;
