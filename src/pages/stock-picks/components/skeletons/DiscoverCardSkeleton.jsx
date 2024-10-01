import React from "react";
import Skeleton from "@mui/material/Skeleton";

function DiscoverCardSkeleton({ length }) {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className=" discover_card_carousel gap-12">
      <div className="card group transition-all duration-500 education border border-gray-200">
        <Skeleton
          animation="wave"
          variant="circular"
          width={86}
          height={86}
          style={{ margin: "auto", marginBottom: "10px" }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="85%"
          height={30}
          style={{ margin: "auto" }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="75%"
          height={20}
          style={{ margin: "auto", marginTop: "10px" }}
        />
      </div>
    </div>
  ));
}

export default DiscoverCardSkeleton;
