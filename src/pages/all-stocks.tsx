import React, { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Footer } from "@/components.v2/index.components";
import AuthContext from "@/components/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  ArrowUp,
  Pause,
  LogOut,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  FileText,
  Clock,
  ArrowUpDown
} from "lucide-react";
import { generateNextSeo } from "next-seo/pages";
import { axiosApi } from "@/utils/axios";
import { STOCK_NEW_STATS_URL, STOCK_NEW_LIST_URL } from "@/pages/api/URLs";
import { useActivePlanContext } from "@/components/PlanContext";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components.v2/ui/tooltip";


// Interface for Report History
interface StatusChange {
  from: string;
  to: string;
}

interface ReportHistory {
  id: string;
  type: string;
  date: string;
  dot: string;
  description: string;
  link: string;
  statusChange: StatusChange | null;
}

// Interface for Stock Recommendation
interface StockPick {
  id: string;
  name: string;
  exchange: string;
  sector: string;
  initDate: string;
  initPrice: string;
  mcap: number;
  mcapLabel: string;
  conviction: number;
  status: string;
  initPriceRaw: number;
  statusHistory: any[];
  reports: ReportHistory[];
  exitDate: string | null;
  exitPrice: string | null;
}

export default function AllStocksPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const { activePlan, loading: planLoading } = useActivePlanContext();
  const plan = activePlan?.plan;

  useEffect(() => {
    if (!planLoading) {
      const planName = plan?.toLowerCase();
      if (!planName || planName === "free") {
        router.replace("/");
      }
    }
  }, [plan, planLoading, router]);


  // State Management
  const [selectedExchange, setSelectedExchange] = useState<string>("All Boards");
  const [selectedActions, setSelectedActions] = useState<string[]>(["BUY"]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"High to Low" | "Low to High" | "Newest to Oldest" | "Oldest to Newest">("High to Low");

  // Debounce search query input to avoid spamming the backend API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchInput);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // Stats count dynamic state initialized to 0
  const [stats, setStats] = useState({
    totalStocksCount: 0,
    activeBuyCount: 0,
    onHoldCount: 0,
    exitedCount: 0
  });

  // Dynamic stocks state
  const [stocks, setStocks] = useState<StockPick[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stocksData, setStocksData] = useState<any>(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchStats = async () => {
    const planName = plan?.toLowerCase();
    if (!planName || planName === "free") return;
    try {
      const refreshToken = localStorage.getItem("refresh");
      const headers = refreshToken ? { Authorization: `token ${refreshToken}` } : {};
      const response = await axiosApi.get(STOCK_NEW_STATS_URL, { headers });

      if (response.data) {
        const data = response.data;
        setStats({
          totalStocksCount: data.total_stocks ?? 0,
          activeBuyCount: data.active_buy ?? 0,
          onHoldCount: data.on_hold ?? 0,
          exitedCount: data.exited ?? 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stock stats:", error);
    }
  };

  const fetchStocks = async () => {
    const planName = plan?.toLowerCase();
    if (!planName || planName === "free") return;
    try {
      setIsLoading(true);
      const refreshToken = localStorage.getItem("refresh");
      const headers = refreshToken ? { Authorization: `token ${refreshToken}` } : {};

      const params: any = {
        page,
        limit,
      };

      if (plan === "core") {
        params.exchange = "Mainboard";
      } else if (plan === "advanced") {
        params.exchange = "SME";
      } else if (selectedExchange && selectedExchange !== "All Boards") {
        params.exchange = selectedExchange;
      }

      if (selectedActions.length > 0) {
        params.action = selectedActions.join(",");
      }
      if (debouncedSearchQuery.trim() !== "") {
        params.search = debouncedSearchQuery;
      }
      if (sortBy === "High to Low") {
        params.sort = "conviction_desc";
      } else if (sortBy === "Low to High") {
        params.sort = "conviction_asc";
      } else if (sortBy === "Newest to Oldest") {
        params.sort = "recency_desc";
      } else if (sortBy === "Oldest to Newest") {
        params.sort = "recency_asc";
      }

      const response = await axiosApi.get(STOCK_NEW_LIST_URL, {
        headers,
        params
      });

      const data = response.data;
      const list = Array.isArray(data) ? data : (data?.results || []);
      const count = typeof data === "object" && data !== null && "count" in data ? data.count : list.length;
      const nextUrl = typeof data === "object" && data !== null && "next" in data ? data.next : null;

      setStocksData(data);
      setStocks(list);
      setTotalCount(count);
      setHasMore(!!nextUrl);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load stats once, and stocks whenever page or login changes
  useEffect(() => {
    fetchStats();
  }, [isLoggedIn, plan]);

  useEffect(() => {
    fetchStocks();
  }, [isLoggedIn, page, plan]);

  // Reset to first page when any filters change to preserve pagination integrity
  useEffect(() => {
    if (page === 1) {
      // If already on page 1, reset page state won't trigger page effect, so we call fetchStocks directly
      fetchStocks();
    } else {
      setPage(1);
    }
  }, [selectedExchange, selectedActions, debouncedSearchQuery, sortBy]);

  // Smoothly scroll to the top of the stocks list container on page changes
  useEffect(() => {
    const element = document.getElementById("stocks-list-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  // Set initial selectedExchange based on the active plan
  useEffect(() => {
    const planName = plan?.toLowerCase();
    if (planName === "core") {
      setSelectedExchange("Mainboard");
    } else if (planName === "advanced") {
      setSelectedExchange("SME");
    } else {
      setSelectedExchange("All Boards");
    }
  }, [plan]);

  // Automatically reset sortBy from conviction sort if only SELL is selected
  useEffect(() => {
    if (selectedActions.length === 1 && selectedActions[0] === "SELL") {
      if (sortBy === "High to Low" || sortBy === "Low to High") {
        setSortBy("Newest to Oldest");
      }
    }
  }, [selectedActions, sortBy]);

  // Back to top scroll state & effect
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  // Dropdown UI states
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Drawer state
  const [selectedStock, setSelectedStock] = useState<StockPick | null>(null);

  // Lock body scroll when selectedStock drawer is open
  useEffect(() => {
    if (selectedStock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStock]);

  // Click outside handlers
  const exchangeRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exchangeRef.current && !exchangeRef.current.contains(event.target as Node)) {
        setIsExchangeOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (actionRef.current && !actionRef.current.contains(event.target as Node)) {
        setIsActionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  // Stats count variables mapped directly from dynamic API state
  const totalStocksCount = stats.totalStocksCount;
  const activeBuyCount = stats.activeBuyCount;
  const onHoldCount = stats.onHoldCount;
  const exitedCount = stats.exitedCount;



  if (planLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FAF9F5]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#125B54] border-t-transparent" />
      </div>
    );
  }

  if (!plan || plan.toLowerCase() === "free") {
    return null;
  }

  return (
    <>
      <Head>
        {generateNextSeo({
          title: "Stock Recommendations - Kamayakya",
          description: "Access all active and exited stock recommendations, detailed research trails, entry levels, and target updates.",
          canonical: "https://www.kamayakya.com/all-stocks",
          openGraph: {
            url: "https://www.kamayakya.com/all-stocks",
            title: "Stock Recommendations - Kamayakya",
            description: "Access all active and exited stock recommendations, detailed research trails, entry levels, and target updates.",
          },
        })}
      </Head>

      <div className="bg-[#FAF9F5] min-h-screen font-open_sans flex flex-col">
        {/* Navbar */}
        <Navbar className="bg-[#FAF9F5] border-b border-gray-200/60 z-40" />

        {/* Main Content Area */}
        <main id="stocks-list-top" className="flex-1 max-w-[1280px] w-full mx-auto px-4 md:px-8 py-8">

          {/* Header Title */}
          <div className="mb-6">
            <h1 className="text-display-sm font-bold text-[#125B54] tracking-tight">Stock Recommendations</h1>
            <p className="text-gray-500 text-sm">All active and closed recommendations.</p>
          </div>

          {/* Stats Cards Section */}
          <div className="relative bg-white rounded-2xl border border-gray-200/80 overflow-hidden p-6 md:p-8">
            {/* The dual colored top bar (Green / Orange split) */}
            <div className="absolute top-0 left-0 right-0 h-[3px] flex">
              <div className="w-1/2 bg-[#125B54]" />
              <div className="w-1/2 bg-[#F79009]" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-gray-100">

              {/* Total Stocks */}
              <div className="flex flex-col justify-between pr-4">
                <div className="flex items-center gap-1.5 text-gray-900 text-xs font-bold tracking-wider uppercase mb-2">
                  <TrendingUp size={14} className="text-gray-400" />
                  <span>Total Stocks</span>
                </div>
                <span className="text-display-sm md:text-display-lg font-semibold text-gray-900 tracking-tight leading-none">{totalStocksCount}</span>
                <div className="text-gray-900 text-xs mt-2">across mainboard & SME</div>
              </div>

              {/* Active Buy */}
              <div className="flex flex-col justify-between md:pl-6 pr-4">
                <div className="flex items-center gap-1.5 text-gray-900 text-xs font-bold tracking-wider uppercase mb-2">
                  <ArrowUp size={14} className="text-[#107569]" />
                  <span>Active Buy</span>
                </div>
                <div>
                  <span className="text-display-sm md:text-display-lg font-semibold text-[#107569] tracking-tight leading-none">{activeBuyCount}</span>
                </div>
                <div className="text-gray-900 text-xs mt-2">currently recommended</div>
              </div>

              {/* On Hold */}
              <div className="flex flex-col justify-between md:pl-6 pr-4">
                <div className="flex items-center gap-1.5 text-gray-900 text-xs font-bold tracking-wider uppercase mb-2">
                  <Pause size={14} className="text-[#D48C00]" />
                  <span>On Hold</span>
                </div>
                <div>
                  <span className="text-display-sm md:text-display-lg font-semibold text-[#D48C00] tracking-tight leading-none">{onHoldCount}</span>
                </div>
                <div className="text-gray-900 text-xs mt-2">based on current valuation</div>
              </div>

              {/* Exited */}
              <div className="flex flex-col justify-between md:pl-6">
                <div className="flex items-center gap-1.5 text-gray-900 text-xs font-bold tracking-wider uppercase mb-2">
                  <LogOut size={14} className="text-gray-500" />
                  <span>Exited</span>
                </div>
                <div>
                  <span className="text-display-sm md:text-display-lg font-semibold text-gray-700 tracking-tight leading-none">{exitedCount}</span>
                </div>
                <div className="text-gray-900 text-xs mt-2">closed positions</div>
              </div>

            </div>
          </div>

          {/* Sticky Container for Warning Banner & Filters */}
          <div className="sticky top-[56px] lg:top-[62px] z-30 bg-[#FAF9F5] pt-4 pb-1 mb-6">
            {/* High Conviction Warning Banner */}
            <div className="flex items-center gap-3 bg-[#F4FAF6] border border-[#125B54]/10 border-l-4 border-l-[#125B54] p-4 rounded-xl shadow-3xs mb-4 text-sm text-gray-700">
              <div className="flex-shrink-0 bg-[#125B54] text-white p-1 rounded-full w-5 h-5 flex items-center justify-center">
                <Check size={12} className="stroke-[3]" />
              </div>
              <p className="leading-relaxed">
                Stocks with <span className="font-semibold text-gray-900">HIGH CONVICTION</span> should be bought on first priority before other recommendations
              </p>
            </div>

            {/* Interactive Filters Bar */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-3xs px-6 py-3.5 mb-0">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

                <div className="flex items-center justify-between sm:justify-start w-full lg:w-auto gap-4">
                  {/* Exchange Filter */}
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] font-black text-gray-700 uppercase tracking-wider">Exchange</span>
                    <div className="relative" ref={exchangeRef}>
                      <button
                        onClick={() => setIsExchangeOpen(!isExchangeOpen)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 hover:border-gray-300 rounded-full text-xs font-semibold text-gray-700 transition-colors shadow-4xs"
                      >
                        <span>{selectedExchange}</span>
                        <ChevronDown size={12} className={`text-gray-500 transition-transform ${isExchangeOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isExchangeOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg py-1.5 z-30 overflow-hidden"
                          >
                            {(["All Boards", "Mainboard", "SME"] as const).map((opt) => {
                              const isSelected = selectedExchange === opt;
                              const isDisabled =
                                (opt === "Mainboard" && plan === "advanced") ||
                                (opt === "SME" && plan === "core") ||
                                (opt === "All Boards" && (plan === "core" || plan === "advanced"));
                              const isLocked = plan === "core" || plan === "advanced";

                              return (
                                <button
                                  key={opt}
                                  disabled={isDisabled || isLocked}
                                  onClick={() => {
                                    setSelectedExchange(opt);
                                    setIsExchangeOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-gray-50 flex items-center justify-between ${isDisabled
                                    ? "opacity-50 cursor-not-allowed text-gray-400"
                                    : isSelected
                                      ? "text-[#125B54] font-bold bg-[#EAF5F4]"
                                      : "text-gray-600"
                                    } ${isLocked ? "cursor-default opacity-100" : ""}`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && <Check size={13} className="text-[#125B54]" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block w-[1px] h-5 bg-[#9ca3af] mx-1"></span>

                  {/* Action Pills / Dropdown */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Action</span>

                    {/* Desktop View: Pills */}
                    <div className="hidden sm:flex items-center gap-2">
                      {(["Buy", "Hold", "Sell"] as const).map((act) => {
                        const upper = act.toUpperCase();
                        const isActive = selectedActions.includes(upper);
                        let activeStyle = "";
                        if (isActive) {
                          if (act === "Buy") {
                            activeStyle = "bg-[#0d8b6d] text-white shadow-3xs border border-transparent";
                          } else if (act === "Hold") {
                            activeStyle = "bg-[#b07800] text-white shadow-3xs border border-transparent";
                          } else {
                            activeStyle = "bg-[#b8412e] text-white shadow-3xs border border-transparent";
                          }
                        } else {
                          activeStyle = "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900";
                        }

                        return (
                          <button
                            key={act}
                            onClick={() => {
                              setSelectedActions((prev) =>
                                prev.includes(upper)
                                  ? prev.filter((item) => item !== upper)
                                  : [...prev, upper]
                              );
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeStyle}`}
                          >
                            {act}
                          </button>
                        );
                      })}
                    </div>

                    {/* Mobile View: Dropdown */}
                    <div className="relative sm:hidden" ref={actionRef}>
                      <button
                        onClick={() => setIsActionOpen(!isActionOpen)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 hover:border-gray-300 rounded-full text-xs font-semibold text-gray-700 transition-colors shadow-4xs"
                      >
                        <span>
                          {selectedActions.length === 3 ? "All" : selectedActions.length === 0 ? "None" : selectedActions.map(a => a.charAt(0) + a.slice(1).toLowerCase()).join(", ")}
                        </span>
                        <ChevronDown size={12} className={`text-gray-500 transition-transform ${isActionOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isActionOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg py-1.5 z-30 overflow-hidden"
                          >
                            {(["Buy", "Hold", "Sell"] as const).map((act) => {
                              const upper = act.toUpperCase();
                              const isSelected = selectedActions.includes(upper);

                              return (
                                <button
                                  key={act}
                                  onClick={() => {
                                    setSelectedActions((prev) =>
                                      prev.includes(upper)
                                        ? prev.filter((item) => item !== upper)
                                        : [...prev, upper]
                                    );
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-gray-50 flex items-center justify-between ${isSelected
                                    ? "text-[#125B54] font-bold bg-[#EAF5F4]"
                                    : "text-gray-600"
                                    }`}
                                >
                                  <span>{act}</span>
                                  {isSelected && <Check size={13} className="text-[#125B54]" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Search input and Sort Dropdown */}
                <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:w-72 sm:flex-none">
                    <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search stock or sector..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200/80 focus:border-[#125B54] focus:ring-1 focus:ring-[#125B54]/10 rounded-full text-xs bg-[#FAF9F5]/80 placeholder-gray-400 text-gray-800 transition-colors shadow-4xs"
                    />
                    {searchInput && (
                      <button
                        onClick={() => setSearchInput("")}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 text-gray-400"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Sort */}
                  <div className="relative" ref={sortRef}>
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-1.5 bg-[#EAF5F4] border border-[#125B54]/10 hover:bg-[#DDF0ED] rounded-full text-xs font-semibold text-[#125B54] transition-colors aspect-square sm:aspect-auto"
                    >
                      <SlidersHorizontal size={13} className="text-[#125B54]" />
                      <span className="hidden sm:inline">{sortBy}</span>
                      <ChevronDown size={12} className={`hidden sm:inline text-[#125B54]/70 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isSortOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 z-30"
                        >
                          {/* Conviction section */}
                          {!(selectedActions.length === 1 && selectedActions[0] === "SELL") && (
                            <>
                              <div>
                                <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase mb-2 block">Conviction</span>
                                <div className="space-y-1">
                                  {(["High to Low", "Low to High"] as const).map((opt) => {
                                    const isActive = sortBy === opt;
                                    return (
                                      <button
                                        key={opt}
                                        onClick={() => {
                                          setSortBy(opt);
                                          setIsSortOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${isActive ? "bg-[#F2F4F7]/60 font-semibold text-gray-900" : "text-gray-700 hover:bg-gray-50 font-medium"
                                          }`}
                                      >
                                        <div className="flex items-center gap-2">
                                          <ArrowUpDown size={13} className={isActive ? "text-gray-750" : "text-gray-400"} />
                                          <span>{opt}</span>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all bg-white ${isActive ? "border-[#125B54]" : "border-gray-200"
                                          }`}>
                                          {isActive && <div className="w-2 h-2 rounded-full bg-[#125B54]" />}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Divider */}
                              <div className="border-t border-gray-100 my-3"></div>
                            </>
                          )}

                          {/* Recency section */}
                          <div>
                            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase mb-2 block">Recency</span>
                            <div className="space-y-1">
                              {(["Newest to Oldest", "Oldest to Newest"] as const).map((opt) => {
                                const isActive = sortBy === opt;
                                return (
                                  <button
                                    key={opt}
                                    onClick={() => {
                                      setSortBy(opt);
                                      setIsSortOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${isActive ? "bg-[#F2F4F7]/60 font-semibold text-gray-900" : "text-gray-700 hover:bg-gray-50 font-medium"
                                      }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Clock size={13} className={isActive ? "text-gray-750" : "text-gray-400"} />
                                      <span>{opt}</span>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all bg-white ${isActive ? "border-[#125B54]" : "border-gray-200"
                                      }`}>
                                      {isActive && <div className="w-2 h-2 rounded-full bg-[#125B54]" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Search/Count Indicator */}
          <div className="text-xs font-bold text-gray-400 tracking-wider mb-6">
            <span>{`Last updated ${stocksData?.last_updated_date}`}</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {stocks.map((stock) => {
                const action: "Buy" | "Hold" | "Sell" =
                  stock.status?.toUpperCase() === "BUY"
                    ? "Buy"
                    : stock.status?.toUpperCase() === "HOLD"
                      ? "Hold"
                      : "Sell";

                const convictionLabel =
                  Number(stock.conviction) >= 8
                    ? "High Conviction"
                    : Number(stock.conviction) >= 5
                      ? "Medium Conviction"
                      : "Low Conviction";

                const getAccentColor = (act: "Buy" | "Hold" | "Sell") => {
                  if (act === "Buy") return "linear-gradient(90deg, #125b54 0%, #7fd28c 100%)";
                  if (act === "Hold") return "linear-gradient(90deg, #b07800 0%, #f0c060 100%)";
                  return "linear-gradient(90deg, #b8412e 0%, #d96c5b 100%)";
                };

                return (
                  <motion.div
                    key={stock.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-[24px] border border-gray-200/80 shadow-3xs p-6 pt-7 pb-6 relative overflow-hidden transition-all flex flex-col justify-between hover:shadow-[0_24px_60px_-20px_rgba(18,91,84,0.22),0_8px_20px_-8px_rgba(18,91,84,0.12)] hover:border-[rgba(18,91,84,0.18)]"
                  >
                    {/* Dynamic accent top bar */}
                    <div className="h-[4px] w-full absolute top-0 left-0 right-0" style={{ background: getAccentColor(action) }} />

                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4 min-w-0">
                        <div className="min-w-0 flex-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-tight truncate cursor-pointer">
                                {stock.name}
                              </h3>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-semibold text-xs">{stock.name}</p>
                            </TooltipContent>
                          </Tooltip>
                          <div className="flex flex-row items-center gap-1.5 mt-2 w-full min-w-0 overflow-hidden">
                            {stock.sector && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase inline-block truncate max-w-[50%] min-w-0 cursor-default">
                                    {stock.sector}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="font-semibold text-xs">{stock.sector}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            {!stock.mcapLabel || stock.mcapLabel === '' ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="bg-[#fff4e0] text-[#e88410] border border-[#fddba0] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase inline-block truncate max-w-[50%] min-w-0 cursor-default">
                                    {stock.exchange}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="font-semibold text-xs">{stock.exchange}</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="bg-white border border-gray-200 text-gray-500 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase inline-block truncate max-w-[50%] min-w-0 cursor-default">
                                    {stock.mcapLabel}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="font-semibold text-xs">{stock.mcapLabel}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </div>

                        {/* Action Badge */}
                        <span className={`flex-shrink-0 text-[11px] font-extrabold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 tracking-wider ${action === "Buy"

                          ? "bg-[#e6f5ef] text-[#0d8b6d]"
                          : action === "Hold"
                            ? "bg-[#fef3e0] text-[#b07800]"
                            : "bg-[#fbece8] text-[#b8412e]"
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${action === "Buy"
                            ? "bg-[#0d8b6d]"
                            : action === "Hold"
                              ? "bg-[#b07800]"
                              : "bg-[#b8412e]"
                            }`}></span>
                          <span>{action.toUpperCase()}</span>
                        </span>
                      </div>

                      {/* Conviction Chip (Only for Buy/Hold) */}
                      {action !== "Sell" && (
                        <div className="mb-4">
                          <span className={`inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-full border tracking-wider uppercase ${convictionLabel === "High Conviction"
                            ? "bg-[#ECFDF5] text-[#107569] border-[#A6F4C5]"
                            : convictionLabel === "Medium Conviction"
                              ? "bg-[#FEF6E9] text-[#B25E00] border-[#FEDF89]"
                              : "bg-[#FEF3F2] text-[#B93815] border-[#FECDCA]"
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${convictionLabel === "High Conviction"
                              ? "bg-[#107569]"
                              : convictionLabel === "Medium Conviction"
                                ? "bg-[#B25E00]"
                                : "bg-[#B93815]"
                              }`}></span>
                            {convictionLabel}
                          </span>
                        </div>
                      )}

                      {/* Dashed Separator */}
                      {action !== "Sell" && <div className="border-t border-dashed border-gray-200 my-4"></div>}

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Entry Date</div>
                          <div className="text-[14px] font-bold text-gray-900 mt-1">{stock.initDate}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Entry Price</div>
                          <div className="text-[14px] font-bold text-gray-900 mt-1">{stock.initPrice}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Mcap at Entry</div>
                          <div className="text-[14px] font-bold text-gray-900 mt-1">
                            {stock.mcap ? `${stock.mcap} Cr.` : "24 Cr."}
                          </div>
                        </div>
                      </div>

                      {/* Exit Metrics for Sell Actions */}
                      {action === "Sell" && (
                        <>
                          <div className="border-t border-dashed border-gray-200 my-4"></div>
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div>
                              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Exit Date</div>
                              <div className="text-[14px] font-bold text-gray-900 mt-1">{stock.exitDate || "-"}</div>
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Exit Price</div>
                              <div className="text-[14px] font-bold text-gray-900 mt-1">
                                {stock.exitPrice ? (String(stock.exitPrice).startsWith("₹") ? stock.exitPrice : `₹${stock.exitPrice}`) : "-"}
                              </div>
                            </div>
                            <div>
                              {(() => {
                                const parsePriceRaw = (price: any): number => {
                                  if (typeof price === "number") return price;
                                  if (!price) return 0;
                                  const clean = String(price).replace(/[^\d.]/g, "");
                                  const parsed = parseFloat(clean);
                                  return isNaN(parsed) ? 0 : parsed;
                                };

                                const entryVal = Number(stock.initPriceRaw || parsePriceRaw(stock.initPrice));
                                const exitVal = parsePriceRaw(stock.exitPrice || 60);
                                let returnsPct = 0;
                                if (entryVal > 0 && exitVal > 0) {
                                  returnsPct = ((exitVal - entryVal) / entryVal) * 100;
                                }

                                const isPositive = returnsPct >= 0;

                                return (
                                  <div className={`px-1.5 py-1.5 rounded-2xl flex flex-col justify-center items-center ${isPositive ? "bg-[#ECFDF5] border border-[#ECFDF5]" : "bg-[#FEF3F2] border border-[#FEF3F2]"
                                    }`}>
                                    <div className="text-[11px] font-extrabold text-gray-400 tracking-wider text-center">Abs. Returns</div>
                                    <div className={`text-sm font-black mt-0.5 flex items-center gap-0.5 ${isPositive ? "text-[#107569]" : "text-[#B93815]"
                                      }`}>
                                      <span>{isPositive ? "▲" : "▼"}</span>
                                      <span>{Math.abs(returnsPct).toFixed(1)}%</span>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* View Details Action */}
                    <button
                      onClick={() => setSelectedStock(stock)}
                      className="w-full mt-4 border-[1.5px] border-[#a8ddd8] border-b-4 border-b-[#7ccbc4] rounded-xl bg-[#dff7f4] cursor-pointer flex items-center justify-center gap-2 py-[9px] px-[20px] text-[13.5px] font-bold text-[#082a26] normal-case tracking-normal [transition:0.28s_cubic-bezier(0.4,0,0.2,1)] hover:bg-[#c8f0ec] hover:border-[#7ccbc4] hover:border-b-[#4aada6] group active:translate-y-[1px]"
                    >
                      <span>View Reports & Details</span>
                      <ChevronRight size={13} className="transition-transform group-hover:translate-x-1 duration-300" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty State */}
            {stocks.length === 0 && (
              <div className="col-span-full bg-white rounded-2xl border border-gray-200/80 shadow-3xs p-12 text-center flex flex-col items-center justify-center">
                <HelpCircle size={48} className="text-gray-300 mb-3" />
                <h3 className="text-lg font-bold text-gray-900">No stocks found</h3>
                <p className="text-gray-400 text-sm mt-1 max-w-sm">No stock picks match your current Exchange, Action, or Search filters. Try adjusting your query.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {stocks.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 sm:px-6 rounded-2xl shadow-3xs border mt-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-xs font-semibold text-gray-700 self-center">
                  Page {page} of {Math.ceil(totalCount / limit) || 1}
                </span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!hasMore}
                  className="relative ml-3 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Showing page <span className="font-bold text-gray-900">{page}</span> of <span className="font-bold text-gray-900">{Math.ceil(totalCount / limit) || 1}</span> <span className="text-gray-300 mx-2">•</span> <span className="font-bold text-gray-900">{totalCount}</span> total recommendations
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-xl shadow-3xs" aria-label="Pagination">
                    <button
                      onClick={() => setPage(p => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center rounded-l-xl px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: Math.ceil(totalCount / limit) || 1 }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 text-xs font-bold ring-1 ring-inset focus:z-20 focus:outline-offset-0 transition-colors ${pageNum === page
                          ? "bg-[#125B54] text-white ring-[#125B54]"
                          : "bg-white text-gray-700 hover:bg-gray-50 ring-gray-300"
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={!hasMore}
                      className="relative inline-flex items-center rounded-r-xl px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Sliding Right-Hand Drawer for Research Trail */}
        <AnimatePresence>
          {selectedStock && (
            <>
              {/* Semi-transparent Backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedStock(null)}
                className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-[520px] bg-[#FAF9F5] shadow-2xl z-[51] flex flex-col"
              >
                {/* Header area */}
                <div className="p-6 md:p-8 bg-white border-b border-gray-200/80 relative">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #125b54 0%, #ff9e29 100%)" }} />

                  {/* Small close button top right */}
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="absolute top-6 right-6 p-2 bg-[#F2F4F7] hover:bg-gray-200/80 text-gray-500 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>

                  <div className="pr-12 min-w-0">
                    <span className="text-xs font-semibold text-[#F79009] tracking-wider uppercase">Research Trail</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h2 className="text-display-sm font-semibold text-gray-900 mt-1 leading-tight truncate cursor-pointer">
                          {selectedStock.name}
                        </h2>
                      </TooltipTrigger>
                      <TooltipContent className="z-[100]">
                        <p className="font-semibold text-xs">{selectedStock.name}</p>
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mt-1">{selectedStock.exchange}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {/* Action Badge */}
                      <span className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full border tracking-wide uppercase ${selectedStock.status?.toUpperCase() === "BUY"
                        ? "bg-[#ECFDF5] text-[#107569] border-[#A3E635]/0"
                        : selectedStock.status?.toUpperCase() === "HOLD"
                          ? "bg-[#FFF9EB] text-[#B25E00] border-[#FEDF89]/50"
                          : "bg-[#FEF3F2] text-[#B93815] border-[#FECDCA]/50"
                        }`}>
                        ● {selectedStock.status}
                      </span>
                      {/* Sector Badge */}
                      <span className="bg-[#F2F4F7] text-[#344054] text-[11px] font-bold px-3 py-0.5 rounded-full tracking-wide">
                        {selectedStock.sector}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Area with report history */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  <h3 className="text-[12px] font-bold text-gray-500 tracking-widest uppercase mb-6">
                    Report History & Status Changes • Latest First
                  </h3>

                  {/* Vertical Timeline container */}
                  <div className="relative pl-6 border-l-2 border-gray-200/85 space-y-8">
                    {selectedStock.reports.map((report, idx) => (
                      <div key={idx} className="relative">

                        {/* Timeline Node Dot */}
                        <div className={`absolute -left-[37px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-[#FAF9F5] shadow-sm ${report.type.includes("Exit") ? "bg-[#B93815]" : "bg-[#107569]"
                          }`} />

                        {/* Timeline Content Card */}
                        <div className="bg-white rounded-2xl border border-[#FFEED9] py-4 px-5 relative hover:shadow-sm hover:translate-x-[4px] transition-all duration-300 ease-in-out">

                          {/* Title & Date */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="font-bold text-xs text-gray-900 leading-tight">{report.type}</h4>
                            <span className="text-xs font-semibold text-gray-700 tracking-wide">{report.date}</span>
                          </div>

                          {/* State Transition badges (Conditional) */}
                          {report.statusChange && (
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded border ${report.statusChange.from === "SELL"
                                ? "bg-[#FEF3F2] text-[#B93815] border-[#B93815]/10"
                                : report.statusChange.from === "HOLD"
                                  ? "bg-[#FFF9EB] text-[#B25E00] border-[#B25E00]/10"
                                  : "bg-[#ECFDF5] text-[#107569] border-[#107569]/10"
                                }`}>
                                {report.statusChange.from}
                              </span>
                              <ArrowRight size={12} className="stroke-[2.5]" />
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded border ${report.statusChange.to === "SELL"
                                ? "bg-[#FEF3F2] text-[#B93815] border-[#B93815]/10"
                                : report.statusChange.to === "HOLD"
                                  ? "bg-[#FFF9EB] text-[#B25E00] border-[#B25E00]/10"
                                  : "bg-[#ECFDF5] text-[#107569] border-[#107569]/10"
                                }`}>
                                {report.statusChange.to}
                              </span>
                            </div>
                          )}

                          {/* Description text */}
                          <p className="text-xs text-gray-500 leading-relaxed font-normal">{report.description}</p>

                          <div className="border-t border-dashed border-gray-100 my-2"></div>

                          {/* Open Report PDF Link */}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (report.link) {
                                window.open(report.link, "_blank");
                              }
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#125B54] hover:text-[#F68700] transition-colors group"
                          >
                            <span>OPEN REPORT</span>
                            <ArrowRight size={12} className="stroke-[2.5] transition-transform group-hover:translate-x-1 duration-300" />
                          </a>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 z-50 p-3.5 bg-[#125B54] hover:bg-[#107569] text-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer border border-[#125B54]/20 flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp size={20} className="stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
