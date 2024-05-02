import React, { useState } from 'react'

const CompanySettings = () => {
  const [companySetting, setCompanySetting] = useState({
    companyName: "",
    displayName: "",
    desc: "",
    streetName: "",
    Number: "",
    pCode: "",
    city: "",
    country: ""
  })
  console.log(companySetting, "companySetting")
  return (
    <>
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
    </>
  )
}

export default CompanySettings
