import StockDetailsSection from "./components/StockDetailsSection";
import Layout from "../../../layout/Layout";
import InvestmentSection from "../components/InvestmentSection";
import ElevateSection from "../components/ElevateSection";
import { useQuery } from "@tanstack/react-query";
import { getStockDetailApi } from "@/api/stock-picks";
import { useRouter } from "next/router";
import { StockDetailsProvider } from "./contexts/StockDetailsContext";
const StockDetails = () => {
  // const router = useRouter();
  // const { slug } = router.query;

  // const {
  //   data: items = {},
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["stockDetail", slug],
  //   queryFn: () => getStockDetailApi({ stockId: slug }),
  //   enabled: !!slug,
  // });
  return (
    // <Layout>
    //   <>
    //     <div className="">
    //       <StockDetailsSection items={items} />
    //     </div>
    //   </>
    // </Layout>
    <StockDetailsProvider>
      <Layout>
        <StockDetailsSection />
      </Layout>
    </StockDetailsProvider>
  );
};

export default StockDetails;
