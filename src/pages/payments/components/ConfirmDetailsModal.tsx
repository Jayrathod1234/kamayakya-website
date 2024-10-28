import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { DialogContent } from "@/components.v2/ui/dialog";
import React, { useEffect, useState } from "react";
import { CustomTextField } from "./DetailSection";
import { InputAdornment } from "@mui/material";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";

export default function ConfirmDetailsModal({
  setOpenDialog,
}: {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setUserDetails, userDetails, setAadharVerified } = usePaymentContext() as IPaymentContext;
  const [address, setAddress] = useState("");
  const [editable, setEditable] = useState(false);

  const handleEditClick = () => {
    setEditable((prev) => !prev);
  };

  const handleConfirm = () => {
    if (address) {
      setUserDetails((prev) => ({ ...prev, address }));
    }
    setAadharVerified(true);
    setOpenDialog(false);
  };

  useEffect(() => {
    setAddress(` ${userDetails.address}`);
  }, [userDetails?.address]);
  return (
    <DialogContent className=" !p-6 !rounded-[20px] min-w-fit md:min-w-[624px] max-w-[784px] open_sans">
      <div className=" flex flex-col md:flex-row gap-6">
        <div className="bg-[linear-gradient(180deg,#EDF5F7_0%,#CFE3EC_100%)] h-[380px] min-w-fit rounded-[20px]">
          <svg
            className=" max-w-[288px]"
            height="271"
            viewBox="0 0 286 271"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.999138">
              <path
                d="M201.877 283.371L120.499 330.355C109.558 336.672 95.5173 332.91 89.2006 321.969L-14.5559 142.258C-20.8725 131.317 -17.1104 117.276 -6.16965 110.96L75.209 63.9757C86.1497 57.6591 100.19 61.4212 106.507 72.362L210.263 252.074C216.58 263.014 212.818 277.055 201.877 283.371Z"
                fill="#533C9D"
              />
              <path
                d="M-1.8568 118.43C-8.67805 122.368 -11.024 131.123 -7.0857 137.944L96.6708 317.656C100.609 324.477 109.364 326.823 116.185 322.885L197.564 275.901C204.386 271.962 206.731 263.208 202.793 256.386L99.0364 76.6749C95.0981 69.8536 86.3439 67.5072 79.5218 71.446L-1.8568 118.43Z"
                fill="#ECF6FD"
              />
              <path
                d="M56.4684 98.7085L32.9982 112.259C26.7862 115.846 18.7701 113.698 15.1836 107.486L61.2424 80.8943C64.8289 87.1063 62.6804 95.122 56.4684 98.7085Z"
                fill="#533C9D"
              />
            </g>
            <path
              d="M221.187 99.9483L147.336 174.673L147.698 225.746L121.918 200.391L96.8707 225.736C93.2001 229.45 87.2128 229.486 83.4987 225.815L38.9119 181.75C35.1979 178.079 35.1634 172.092 38.834 168.378L163.15 42.5904C166.821 38.8764 172.808 38.8404 176.522 42.511L221.109 86.5764C224.823 90.247 224.857 96.2343 221.187 99.9483Z"
              fill="#59C38F"
            />
            <path
              d="M184.051 98.415L166.615 81.1829"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M187.153 86.5563L163.512 93.0415"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M178.436 77.9409L172.23 101.657"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M154.463 128.353L137.027 111.121"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M157.566 116.494L133.925 122.979"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M148.849 107.879L142.642 131.595"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M124.876 158.291L107.44 141.058"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M127.979 146.432L104.337 152.917"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M119.261 137.816L113.055 161.532"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M95.2877 188.229L77.8516 170.997"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M98.3903 176.37L74.749 182.855"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M89.673 167.755L83.4663 191.471"
              stroke="white"
              stroke-width="6.35411"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className=" flex flex-col gap-y-6 w-full">
          <p className=" text-xl text-[#101828] font-semibold">Confirm Your Details</p>
          <div className=" grid grid-cols-2 border  rounded-lg border-[#EDEDED] bg-[#EDF0F538] w-full">
            <div className=" col-span-1 p-4 border-r border-r-[#EDEDED]">
              <p className=" text-2xs text-[#707070]">Name</p>
              <p className=" text-sm text-[#121212] mt-[6px]">{userDetails?.name}</p>
            </div>
            <div className=" col-span-1 p-4">
              <p className=" text-2xs text-[#707070]">PAN No.</p>
              <p className=" text-sm text-[#121212] mt-[6px]">{userDetails?.pan}</p>
            </div>
            <div className=" col-span-2 p-4 border-t border-t-[#EDEDED]">
              <p className=" text-2xs text-[#707070]">Address</p>
              <textarea
                contentEditable={editable}
                onChange={(e) => {
                  if (!editable) return;
                  setAddress(e.target.value);
                }}
                value={address}
                className=" resize-none text-sm text-[#121212] bg-transparent block w-full mt-[6px]"
              />
              <button onClick={handleEditClick} className=" text-sm font-semibold text-[#0E6C63] ">
                Edit Address
              </button>
            </div>
          </div>
          <Button onClick={handleConfirm} className=" ml-auto" variant={ButtonVariant.primary}>
            <p>Confirm</p>
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
