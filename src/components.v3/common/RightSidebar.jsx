import React, { useState } from "react";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";

export default function RightSidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Item 1", "Item 2", "Item 3"].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Right Sidebar</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
