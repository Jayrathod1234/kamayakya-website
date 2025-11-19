import React, { useEffect, useState } from "react";
import SectionHead from "./SectionHead";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components.v2/ui/table";
import { getUserProfilePaymentHistory } from "@/api/profile";
import {
  ColumnFiltersState,
  // ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import PlanCards from "./PlanCards";
import { format, isValid } from "date-fns";
import { convertDaysToPlanDuration } from "@/lib/date-formatter";
import { PLAN } from "@/constants/pricing/plans";
import { Input } from "@/components.v2/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components.v2/ui/dropdown-menu";
import { Button } from "@/components.v2/ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import ToPayTooltip from "@/pages/payments/components/ToPayTooltip";
import AmoountBreakdown from "./AmountBreakdown";
import { getMixPanelClient } from "@/externals/mixpanel";

export const columns = [
  {
    accessorKey: "payment_time",
    header: ({ column }: any) => {
      return (
        <span
          className=" flex items-center text-inherit"
          aria-label="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Date
          <ArrowUpDown className=" ml-2" size={16} color="#BCC2CE" />
        </span>
      );
    },
    cell: ({ row }: any) => {
      const date = new Date(row.getValue("payment_time"));
      return isValid(date) ? format(date, "dd MMM, yyyy") : "NA";
    },
  },
  {
    accessorKey: "subscription_name",
    header: "Plan",
    cell: ({ row }: any) => {
      const planName = row.getValue("subscription_name");
      const duration = convertDaysToPlanDuration(row.original["subscription_days"]);
      const subtext = PLAN[planName as keyof typeof PLAN].label;
      return (
        <div>
          <p className=" text-sm font-semibold text-[#272A2F]">
            {planName?.toUpperCase()} - {duration}
          </p>
          <p className=" text-2xs text-gray-500 mt-1">{subtext}</p>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "membership_date",
    header: "Membership Date",
    cell: ({ row }: any) => {
      const startDate = new Date(row.original["start_date"]);
      const endDate = new Date(row.original["end_date"]);
      const formatedStartDate = isValid(startDate) ? format(startDate, "dd MMM, yyyy") : "NA";
      const formatedEndDate = isValid(endDate) ? format(endDate, "dd MMM, yyyy") : "NA";
      return formatedStartDate + " to " + formatedEndDate;
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    enableSorting: false,
  },
  {
    accessorKey: "paid_amount",
    header: "Total Amount",
    cell: ({ row }: any) => {
      const amount = row.getValue("paid_amount") + row.original["discount_amount"];
      const formattedAmount = amount.toLocaleString("en-IN");
      const basePrice = Number(amount / 1.18);
      const gst = amount - basePrice;
      const grandTotal = row.getValue("paid_amount")?.toLocaleString("en-IN");
      const discountAmount = row.original["discount_amount"];
      const discountPercent = ((discountAmount / amount) * 100).toFixed(2);
      return (
        <AmoountBreakdown
          totalAmountBeforeDiscount={amount}
          discountAmount={discountAmount}
          discountLabel={discountAmount ? `${row.original["discount_code"]} - ${discountPercent}%` : null}
          grandTotal={grandTotal}
          basePrice={`₹${Number(basePrice.toFixed(2)).toLocaleString("en-IN")}`}
          gst={`₹${Number(gst.toFixed(2)).toLocaleString("en-IN")}`}
        >
          {" "}
          <p>₹{grandTotal}</p>
        </AmoountBreakdown>
      );
    },
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
    enableSorting: false,
    cell: ({ row }: any) => {
      const invoiceLink = row.getValue("invoice");
      if (!invoiceLink) return <p className=" w-full text-center">NA</p>;
      return (
        <div className=" flex items-center justify-center">
          <Link
            target="_blank"
            href={invoiceLink}
            onClick={() => {
              const mp = getMixPanelClient();
              mp.track("invoice_download", {
                page: "profile_page",
              });
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.00004 7.33337V11.3334M6.00004 11.3334L7.33337 10M6.00004 11.3334L4.66671 10M14.6667 6.66671V10C14.6667 13.3334 13.3334 14.6667 10 14.6667H6.00004C2.66671 14.6667 1.33337 13.3334 1.33337 10V6.00004C1.33337 2.66671 2.66671 1.33337 6.00004 1.33337H9.33337M14.6667 6.66671H12C10 6.66671 9.33337 6.00004 9.33337 4.00004V1.33337M14.6667 6.66671L9.33337 1.33337"
                stroke="#292D32"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
      );
    },
  },
];

export default function BillingHistory() {
  const [data, setData] = useState<any>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const fetchPaymentHistory = async () => {
    try {
      const res = await getUserProfilePaymentHistory();

      setData(res?.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <div id="billing-history">
      <SectionHead sectionHead="Billing History" />
      <section className="mt-3 flex flex-col gap-y-4 sm:hidden">
        {Array.isArray(data) && data?.length > 0 ? (
          data.map((plan) => <PlanCards key={plan?.id} plan={plan} />)
        ) : (
          <p className=" text-center">No Plans found. </p>
        )}
      </section>
      <section className="mt-3 max-sm:hidden bg-white p-6 rounded-xl">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search plans..."
            value={(table.getColumn("subscription_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("subscription_name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        <Table divClassname="overflow-y-auto  block max-h-[500px] billing__table" className=" border-0  ">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className=" border-0 bg-gray-50 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className=" !border-0 !border-b-0" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className=" border-0 !border-b-0 h-auto py-3 text-3xs text-[#464F60] font-semibold uppercase"
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=" border-0 ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className=" " key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className=" border-0 !border-b-1 border-b-[#F2F4F7]" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
