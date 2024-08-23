import { Drawer } from "@mui/material";
import { useState } from "react";

const DrawerComponent = (props) => {
  const { children, drawerOpen, drawerAnchor, setDrawerOpen } = props;

  //   const [open, setOpen] = useState(drawerOpen);
  console.log(drawerOpen, "****Open");

  return (
    <>
      <Drawer
        open={drawerOpen}
        anchor={drawerAnchor}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
