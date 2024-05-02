import { faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBug, faEllipsisVertical, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import TabBarWithRender from '../../components/common/Tab/TabBarWithRender';
import CompanySettings from '../../components/TabContent/CompanySettings';
import ReportSettings from '../../components/TabContent/ReportSettings';
import TableSetup from '../../components/TabContent/TableSetup';
import InvoiceSettings from '../../components/TabContent/InvoiceSettings';
import LoyaltySettings from '../../components/TabContent/LoyaltySettings';
import NotificationSettings from '../../components/TabContent/NotificationSettings';
import OthersSettings from '../../components/TabContent/OthersSettings';
const HomePage = (props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <> 
    <div className="outr-right-content">
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
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </span>
            </a>
          </div>
          <div className="tabs-container">
          
            <TabBarWithRender
              tabs={[
                { title: "Company Settings", render: () => <CompanySettings/> },
                { title: "Report Settings", render: () => <ReportSettings/> },
                { title: "Table Setup", render: () => <TableSetup/> },
                { title: "Invoice Settings", render: () => <InvoiceSettings/> },
                { title: "Loyalty Settings", render: () => <LoyaltySettings/> },
                { title: "Notification Settings", render: () => <NotificationSettings/> },
                { title: "Others Settings", render: () => <OthersSettings/> }
              ]}
            />
          </div>  
        </div>
      </div>
    </div>


  </>
  );
};

export default HomePage;