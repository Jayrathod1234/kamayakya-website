import React from "react";

import Nonlogincard from "./Nonlogincard";
import MainBoardcard from "./MainBoardcard";
import Hotstockcard from "./Hotstockcard";
import HotNewcard from "./HotNewcard";

function MainBoardArea() {
  return (
    <>
      {/* Non-login-user card blur effect */}
      <Nonlogincard />
      {/* login-user card  */}
      <MainBoardcard />
      {/* hot stock card  */}
      <Hotstockcard />
      {/* hotNew stock card  */}
      <HotNewcard />
    </>
  );
}

export default MainBoardArea;
