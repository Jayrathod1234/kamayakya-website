import Link from "next/link";
import { useRouter } from "next/router";

interface breadcrumb {
  previousPath: Array<{ path: string; link: string }>;
  activePath: string;
}

interface DataType {
  data: breadcrumb;
}

{
  /* <div
                className="flex items-center cursor-pointer group"
                onClick={() => {
                  router.push("/stock-picks");
                }}
              >
                <img
                  src="/assets/stock-details/arrow-left.svg"
                  alt="Go Back"
                  className="mr-2"
                />
                <div className="text-[13px] text-[#475467] font-normal font-open_sans relative text-nowrap me-1 max-w-[83px]">
                  Stocks To Buy
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#475467] transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>
              <img src="/assets/stock-details/chevron-right.svg" alt="" />
              <div className="text-[13px] text-[#475467] font-semibold max-[138px] truncate">
                {stock_name}
              </div> */
}

export function Breadcrumb({ data }: DataType) {
  const router = useRouter();
  const handleClick = () => router.back();
  return (
    <div className="flex items-center">
      <img onClick={handleClick} src="/assets/stock-details/arrow-left.svg" alt="Go Back" className="mr-[13px]" />
      <div className=" flex items-center">
        {data.previousPath.map((item) => (
          <Link key={item.link} href={item.link}>
            <div className=" flex items-center cursor-pointer group gap-x-[3px]">
              <div className=" text-[13px] text-[#475467] font-normal font-open_sans relative text-nowrap max-w-[83px]">
                {item.path}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#475467] transition-all duration-300 group-hover:w-full"></div>
              </div>

              <div>
                <img src="/assets/stock-details/chevron-right.svg" alt="" />
              </div>
            </div>
          </Link>
        ))}

        <span className="text-[13px] text-[#475467] font-semibold max-[138px] truncate ml-[3px]">
          {data.activePath}
        </span>
      </div>
    </div>
  );
}
