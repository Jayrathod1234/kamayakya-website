import React from "react";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { IconButton, InputAdornment, OutlinedInput, styled, TextField } from "@mui/material";
import { ArrowLeft, Check, Mail } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components.v2/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";

// Custom styled OutlinedInput
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0000000F",

      borderRadius: 6.2,
      // paddingVertical:"9px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00645A", // Focus color
      borderWidth: 2,
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 1,
    },
    "& input": {
      padding: "9px !important",
      paddingRight: "10px !important",
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
  },
});

export default function DetailSection() {
  return (
    <div className="mt-9">
      <div className="flex items-center mb-9">
        <ArrowLeft size={18} />
        <p className="ml-[5px] text-xs text-gray-600">Go Back to Previous Page</p>
      </div>
      <div className="grid grid-cols-2 gap-y-9 gap-x-[22px]">
        <div className="col-span-2">
          <Dialog>
            <p className="text-xs text-gray-500">
              Aadhar Card Number<span className="text-error-500">*</span>
            </p>
            <CustomTextField
              id="aadhar-number"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment className="!pr-0" position="end">
                    <DialogTrigger>
                      <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                        <p className="text-sm font-semibold">Send OTP</p>
                      </Button>
                    </DialogTrigger>
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !py-[9px] !pr-[0px] !rounded-[6.2px] !border-[#0000000F]"
            />
            <DialogContent className=" !p-6 !rounded-[20px] min-w-fit md:min-w-[624px] max-w-[784px]">
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

                {/* <div className=" flex flex-col gap-y-6">
                  <p className=" text-xl text-[#101828] font-semibold">Verify Your Aadhar Card</p>
                  <p className=" text-sm text-[#737373]">
                    We have sent a One Time Password (OTP) to the mobile number linked to your aadhar card. Please enter
                    it to complete verification
                  </p>
                  <div className=" md:mt-4">
                    <div></div>
                    <p className=" text-2xs"> Haven’t received the OTP?</p>
                    <div className=" mt-7 p-3 bg-[#F8FFFE] rounded-lg flex gap-x-2 items-center">
                      <Checkbox />
                      <p className=" text-[#101828] text-2xs">
                        By verifying OTP, you consent to us retrieving your PAN as per SEBI guidelines.
                      </p>
                    </div>
                  </div>
                  <Button className=" ml-auto" variant={ButtonVariant.primary}>
                    <p>Verify OTP</p>
                  </Button>
                </div> */}
                <div className=" flex flex-col gap-y-6">
                  <p className=" text-xl text-[#101828] font-semibold">Confirm Your Details</p>
                  <div className=" grid grid-cols-2">
                    <div className=" col-span-1 p-4">
                      <p className=" text-2xs text-[#707070]">Name</p>
                      <p className=" text-sm text-[#121212] mt-[6px]">Antonio Roberto</p>
                    </div>
                    <div className=" col-span-1 p-4">
                      <p className=" text-2xs text-[#707070]">PAN No.</p>
                      <p className=" text-sm text-[#121212] mt-[6px]">AAAA1234AA</p>
                    </div>
                    <div className=" col-span-2 p-4">
                      <p className=" text-2xs text-[#707070]">Address</p>
                      <p className=" text-sm text-[#121212] mt-[6px]">
                        Purvoday Bhawan, 302, 3rd Floor, Royal Plaza, opposite Apollo Hospital, Guwahati, Assam 781005,
                        India
                      </p>
                      <p className=" text-sm font-semibold text-[#0E6C63]">Edit Address</p>
                    </div>
                  </div>
                  <Button className=" ml-auto" variant={ButtonVariant.primary}>
                    <p>Confirm</p>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500">
            Full Name<span className="text-error-500">*</span>
          </p>
          <CustomTextField
            id="full-name"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
          />
          {/* <p className="text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p> */}
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500">
            PAN Number<span className="text-error-500">*</span>
          </p>
          <CustomTextField
            id="pan-number"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500">
            Address<span className="text-error-500">*</span>
          </p>
          <CustomTextField
            id="address"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
          />
        </div>
        <div className="col-span-1">
          <p className="text-xs text-gray-500">
            Email<span className="text-error-500">*</span>
          </p>
          <div className="flex">
            <CustomTextField
              id="email"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={15} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            />
          </div>
          <p className="text-3xs text-gray-500 mt-[6px]">You will get your invoice on email</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs text-gray-500">
            Phone<span className="text-error-500">*</span>
          </p>
          <div className="flex">
            <div
              // className="  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
              className="!mt-[6px] border border-[#0000000F] rounded-[6.2px] py-[9px] px-[14px] flex items-center"
            >
              <PhoneInput
                className=" "
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={"7507139592"}
                onChange={(value) => {
                  // handleInputs(value!, setPhone);
                  // if (error.phoneError) {
                  //   setError((prev) => ({ ...prev, phoneError: false }));
                  // }
                }}
              />{" "}
              <InputAdornment position="end">
                <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
              </InputAdornment>
            </div>

            {/* <CustomTextField
              id="phone"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                  <Mail size={15}/>
                </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon"/>
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            /> */}
          </div>
          <p className="text-3xs text-gray-500 mt-[6px]">You will get stock action calls on WhatsApp</p>
        </div>
        <div className="col-span-2 flex space-x-2 items-center">
          <Checkbox id="GSTIN" />
          <p className=" text-sm text-gray-950">Use GSTIN for this order</p>
        </div>
        <div className="col-span-2 p-4 border rounded-xl border-gray-150">
          <p className="text-xs text-gray-500">
            GST Details<span className="text-error-500">*</span>
          </p>
          <div className="flex">
            <CustomTextField
              id="phone"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            />
          </div>
        </div>
        <div className="col-span-2 ">
          <Button className=" w-full" variant={ButtonVariant.primary}>
            <p className=" text-sm font-medium">Proceed to Checkout</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
