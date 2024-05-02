import React, { useState } from "react";
import styled from "styled-components";

export default function TabBarWithRender({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
    <nav className="tabs">
      <TabContainer>
        
        {tabs.map((tab, index) => (
          <TabButton className={activeTab ? "active" :' '}key={index} active={activeTab === index} onClick={() => setActiveTab(index)}>
            <Title active={activeTab === index}>{tab.title}</Title>
            <Indicator active={activeTab === index} />
          </TabButton>
        ))}
        
      </TabContainer>
      </nav>
      {tabs[activeTab].render()}
    </>
  );
}

const TabContainer = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
//   height: 60px;
`;
const TabButton = styled.button`
//   width: 100%;
//   height: 100%;
//   padding: 10px;
  border: none;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
  position: relative;
  transition: 0.6s;
//background: ${props => (props.active ? "#d1e0e0" : "#f2f2f2")};
background:transparent;
  &:focus {
    outline: none;
  }
`;
const Title = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-transform: uppercase;
  font-size: 20px;
  color: ${props => (props.active ? "#066a69" : "#333")}!important;
  transition: 0.6s;
`;
const Indicator = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${props => (props.active ? "#066a69" : "transparent")};
  transition: 0.6s;
`;

