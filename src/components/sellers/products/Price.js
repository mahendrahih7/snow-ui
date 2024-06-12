import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Price = () => {
  return (
    <>
      <div id="prices" className="tb_c" style={{ display: "none" }}>
        <div className="title-bx" id="price_tab">
          <div className="outr_title">
            <ul id="list" className="listitem">
              <li className="litext">Color</li>
              <li className="litext">Weight</li>
              <li className="litext currentItem">Price</li>
            </ul>
            <button type="" className="add_title tab_lst_add">
              {/* <i className="fas fa-plus" /> */}
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="title_add_outr hidden">
            <input type="text" defaultValue="" className="input-field hidden" />
            <button type="button" className="add__btn">
              Add
            </button>
          </div>
          <div id="pro_header">
            <div className="outr_all_header">
              <div className="all_title">
                <div className="input-field-outr">
                  <span>Price</span>
                  <input type="text" defaultValue="" />
                </div>
              </div>
              <button
                type="button"
                className="add_row hidden tab_lst_add"
                onClick="addField(this)"
              >
                {/* <i className="fas fa-plus" /> */}
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                type="button"
                className="delete_btn hidden tab_lst_add"
                onClick="removeItem(this)"
              >
                {/* <i className="fa-solid fa-minus" /> */}
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Price;
