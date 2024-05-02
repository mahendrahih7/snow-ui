import React, { useState } from "react";
import styled from "styled-components";

export default function TabBar({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  // Tried a similar approach first but didn't work since the tabs where siblings in App.js
  // The siblings can't know eachothers state without some global state or context hook
  // Mapping the tabs from tabs-array in App.js instead

  return (
    <TabContainer>
      {tabs.map((title, index) => (
        <TabButton key={index} active={activeTab === index} onClick={() => setActiveTab(index)}>
          <Title active={activeTab === index}>{title}</Title>
          <Indicator active={activeTab === index} />
        </TabButton>
      ))}
    </TabContainer>
  );
}

const TabContainer = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  margin-bottom: 100px;
`;
const TabButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: 0.6s;
  background: ${props => (props.active ? "#d1e0e0" : "#f2f2f2")};
  &:focus {
    outline: none;
  }
`;
const Title = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-transform: uppercase;
  font-size: 20px;
  color: ${props => (props.active ? "#3e5b5b" : "#333")};
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
  border-bottom-color: ${props => (props.active ? "#3e5b5b" : "#f1f1f1")};
  transition: 0.6s;
`;
