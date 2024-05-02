import React from 'react'

const InvoiceSettings = () => {
  return (
    <>
      <div id="tab-4" className="tab-content current">
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
                              <label>Bank account number</label>
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
    </>
  )
}

export default InvoiceSettings
