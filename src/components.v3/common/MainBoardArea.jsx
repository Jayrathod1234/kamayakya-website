import React from "react";

import Nonlogincard from "./Nonlogincard";
import MainBoardcard from "./MainBoardcard";
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
      {/* <MainBoardcard /> */}
    </>
  );
}

export default MainBoardArea;
