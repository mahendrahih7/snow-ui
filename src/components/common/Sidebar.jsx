import React from 'react'
import { Drawer, List } from "@mui/material";
// import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const Sidebar = () => {
  return (
   
      <List disablePadding>
        {/* <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <Avatar src={assets.images.logo} />
          </Stack>
        </Toolbar> */}
        {appRoutes.map((route, index) => {
          // console.log(route,'kkl')
          return(
            route.sidebarProps ? (
              route.child ? (
               <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          )
        })}
      </List>
  
  );
};

export default Sidebar;