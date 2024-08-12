import React from "react";

import Nonlogincard from "./Nonlogincard";
import MainBoardcard from "./MainBoardcard";
import Hotstockcard from "./Hotstockcard";
import HotNewcard from "./HotNewcard";
import HotNewcard from "./HotNewcard";
import HotNewCardBlur from "./HotNewCardBlur"

function MainBoardArea() {
  return (
    <>
      {/* Non-login-user card blur effect */}

      <HotNewCardBlur/>

      {/* <Nonlogincard /> */}
      <HotNewcard/>

      {/* login-user card  */}
      <MainBoardcard />
      {/* hot stock card  */}
      <Hotstockcard />
   
    </>
  );
}

export default MainBoardArea;
