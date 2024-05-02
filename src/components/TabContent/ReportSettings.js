import React from 'react'

const ReportSettings = () => {
  const reportData = [
    "Show totals summary",
    "Show receipts overview",
    "Show receipt ID in the receipts overview",
    "Append floor report to day reports,When enabled, the day report will contain a total for all floors as well as a breakdown per floor",
    "Show users summary",
    "Show the number of payments in payments section",
    "Book receipts on the day the receipt was finalized",
    "Show service charge details",
    "Show 'Cash Due'",
    "Show discounts by type/user"
  ]
  return (
    <>
      <div id="tab-2" className="tab-content current">
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
                {
                  reportData.map((ele) =>
                    <form>
                      <div className="rprt_stng_form_innr">
                        <input type="checkbox" name="chk" className="chk" />
                        <label>{ele}</label>
                      </div>
                    </form>
                  )
                }
                {/* <form>
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
                    <label>Append floor report to day reports
                      <span>
                        When enabled, the day report will contain a total
                        for all floors as well as a breakdown per floor.
                      </span>
                    </label>
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportSettings
