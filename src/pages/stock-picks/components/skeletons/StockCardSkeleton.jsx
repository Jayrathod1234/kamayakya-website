import React from "react";
import { Skeleton, Box } from "@mui/material";

function StockCardSkeleton({ length, className }) {
  return Array.from({ length }).map((_, index) => (
    <Box
      key={index}
      className={`${className} relative  rounded-lg bg-white shadow-6xs`}
    >
      <Box
        className="relative rounded-lg bg-white shadow-6xs border border-gray-200"
        p={2}
      >
        {/* Skeleton for the top section */}
        <Box className="pt-[20px] px-[10px] flex gap-[18px] items-center ">
          <Skeleton
            animation="wave"
            variant="circular"
            width={30}
            height={30}
          />
          <Skeleton
            animation="wave"
            sx={{ borderRadius: "6px" }}
            variant="text"
            width={240}
            height={30}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={30}
            height={30}
          />
        </Box>

        {/* Skeleton for the middle section */}
        <Box className="pt-[12px] px-[16px] pb-[20px]">
          <Box className="flex items-center gap-[8px]">
            <Skeleton
              animation="wave"
              sx={{ borderRadius: "20px" }}
              variant="rectangular"
              width={100}
              height={20}
            />
            <Skeleton
              animation="wave"
              sx={{ borderRadius: "20px" }}
              variant="rectangular"
              width={100}
              height={20}
            />
            <Skeleton
              animation="wave"
              sx={{ borderRadius: "20px" }}
              variant="rectangular"
              width={100}
              height={20}
            />
          </Box>
        </Box>

        {/* Skeleton for the Upside left section */}
        <Box className="px-4 pb-3 max-auto">
          <Box className="p-[8px] rounded-xl ">
            <Box className="rounded-[7px] text-center text-white">
              <Skeleton
                animation="wave"
                sx={{ borderRadius: "20px" }}
                variant="rectangular"
                width="100%"
                height={150}
              />
            </Box>
          </Box>
        </Box>

        {/* Skeleton for Progress Bar */}
        <Box className="pt-5 pb-[10px]  max-auto">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={20}
          />
        </Box>

        {/* Skeleton for the button */}
        <Box className="pt-5 pb-[10px] max-auto">
          <Skeleton
            animation="wave"
            sx={{ borderRadius: "5px" }}
            variant="rectangular"
            width="100%"
            height={40}
          />
        </Box>
      </Box>
    </Box>
  ));
}

export default StockCardSkeleton;
