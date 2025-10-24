export default function ComplianceAuditPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <p className="text-sm md:text-base text-foreground italic leading-relaxed text-balance text-center">
          "Disclosure with respect to compliance with Annual compliance audit requirement under Regulation 25(3) of SEBI
          (Research Analyst) Regulations, 2014 for last financial years are as under:
        </p>
      </div>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto border border-border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-bold text-foreground">Sr. no</th>
              <th className="border border-border px-4 py-3 text-left font-bold text-foreground">Financial Year</th>
              <th className="border border-border px-4 py-3 text-left font-bold text-foreground">
                Compliance Audit Status
              </th>
              <th className="border border-border px-4 py-3 text-left font-bold text-foreground">Remarks, If any</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="border border-border px-4 py-3 text-foreground">1</td>
              <td className="border border-border px-4 py-3 text-foreground">FY 2023-24</td>
              <td className="border border-border px-4 py-3 text-foreground">Conducted</td>
              <td className="border border-border px-4 py-3 text-foreground">N/A</td>
            </tr>
            <tr className="hover:bg-muted/50 transition-colors">
              <td className="border border-border px-4 py-3 text-foreground">2</td>
              <td className="border border-border px-4 py-3 text-foreground">FY 2024-25</td>
              <td className="border border-border px-4 py-3 text-foreground">Conducted</td>
              <td className="border border-border px-4 py-3 text-foreground">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {[
          { sr: "1", year: "FY 2023-24", status: "Conducted", remarks: "N/A" },
          { sr: "2", year: "FY 2024-25", status: "Conducted", remarks: "N/A" },
        ].map((row, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Sr. No</p>
                <p className="text-foreground font-medium">{row.sr}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Financial Year</p>
                <p className="text-foreground font-medium">{row.year}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Compliance Audit Status</p>
                <p className="text-foreground font-medium">{row.status}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Remarks</p>
                <p className="text-foreground">{row.remarks || "-"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
