import React from "react";

import Nonlogincard from "./Nonlogincard";
import MainBoardcard from "./MainBoardcard";

function MainBoardArea() {
  return (
    <>
    {/* Non-login-user card blur effect */}
      <Nonlogincard />
      {/* login-user card  */}
      <MainBoardcard />
    </>
  );
}

export default MainBoardArea;
