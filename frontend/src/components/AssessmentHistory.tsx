import React, { useState } from "react";
import type { AssessmentRecord } from "../types";
import { exportAssessmentsToCSV, exportAssessmentsToJSON } from "../services/api";
import { Search, Download, FileText, Eye, X } from "lucide-react";

interface AssessmentHistoryProps {
  records: AssessmentRecord[];
  onStartAssessment: () => void;
}

export const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({
  records,
  onStartAssessment,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<AssessmentRecord | null>(null);

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.personnel_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.assessment_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterClass === "all" || r.prediction.toLowerCase() === filterClass.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary block mb-3">
              [ AUDIT LOG & ARCHIVE ]
            </span>
            <h1 className="h1-display text-foreground mb-4">
              ASSESSMENT<br />
              HISTORY
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Timeline view of completed AI-assisted personnel welfare assessments.
            </p>
          </div>

          {/* Export Controls */}
          {records.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => exportAssessmentsToCSV(records)}
                className="px-4 py-2.5 bg-card hover:bg-background border border-border hover:border-primary text-xs font-archivo font-bold uppercase tracking-wider text-foreground flex items-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>EXPORT CSV</span>
              </button>
              <button
                onClick={() => exportAssessmentsToJSON(records)}
                className="px-4 py-2.5 bg-card hover:bg-background border border-border hover:border-primary text-xs font-archivo font-bold uppercase tracking-wider text-foreground flex items-center gap-2 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>EXPORT JSON</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Personnel ID or Assessment #..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border text-foreground font-archivo text-xs outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-archivo font-bold text-muted-foreground uppercase tracking-widest shrink-0">
              FILTER:
            </span>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full md:w-48 px-3 py-2 bg-background border border-border text-foreground font-archivo text-xs outline-none focus:border-primary uppercase"
            >
              <option value="all">ALL PREDICTIONS</option>
              <option value="No">NO (ROUTINE)</option>
              <option value="Maybe">MAYBE (MONITORING)</option>
              <option value="Yes">YES (ACTIONABLE)</option>
            </select>
          </div>
        </div>

        {/* Timeline / Editorial Layout */}
        {filtered.length === 0 ? (
          <div className="bg-card border-2 border-border p-12 text-center my-12">
            <h3 className="h3-display text-2xl text-foreground mb-3">NO ASSESSMENTS YET.</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Complete your first AI-assisted assessment to begin building your local assessment history.
            </p>
            <button
              onClick={onStartAssessment}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-archivo font-black text-xs uppercase tracking-wider shadow-lg"
            >
              START ASSESSMENT
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((record, index) => (
              <div
                key={record.assessment_id}
                className="bg-card border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary transition-all duration-200 group"
              >
                {/* Left Info */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                  <div className="font-archivo">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                      ASSESSMENT #{String(filtered.length - index).padStart(3, "0")}
                    </span>
                    <span className="font-black text-xl text-foreground tracking-tight">
                      {record.personnel_id}
                    </span>
                  </div>

                  <div className="font-archivo">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                      GROWING STRESS
                    </span>
                    <span className={`inline-block px-3 py-1 font-black text-sm uppercase tracking-wider ${
                      record.prediction === "Yes"
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : record.prediction === "Maybe"
                        ? "bg-card text-muted-foreground border border-border"
                        : "bg-background text-foreground border border-border"
                    }`}>
                      {record.prediction}
                    </span>
                  </div>

                  <div className="font-archivo">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                      MODEL CONFIDENCE
                    </span>
                    <span className="font-black text-sm text-foreground">
                      {record.confidence ? `${record.confidence.toFixed(1)}%` : "—"}
                    </span>
                  </div>

                  <div className="font-archivo">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                      DATE
                    </span>
                    <span className="font-bold text-xs text-muted-foreground">
                      {record.date}
                    </span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 border-t md:border-t-0 border-border pt-4 md:pt-0">
                  {record.is_demo ? (
                    <span className="text-[10px] font-archivo font-bold text-muted-foreground uppercase tracking-widest bg-background px-2.5 py-1 border border-border">
                      DEMO BENCHMARK
                    </span>
                  ) : (
                    <span className="text-[10px] font-archivo font-bold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 border border-primary/30">
                      LIVE EVALUATION
                    </span>
                  )}

                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="p-2.5 bg-background hover:bg-primary hover:text-primary-foreground border border-border transition-colors"
                    title="Inspect Submitted Features"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feature Inspection Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xl bg-card border-2 border-border p-6 md:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div>
                  <span className="text-[11px] font-archivo font-bold text-primary uppercase tracking-widest block mb-1">
                    AUDIT INSPECTION
                  </span>
                  <h3 className="font-archivo font-black text-xl text-foreground">
                    {selectedRecord.personnel_id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-background border border-border text-xs font-archivo">
                <div>
                  <span className="text-muted-foreground uppercase block text-[10px]">PREDICTION</span>
                  <strong className="text-primary text-base font-black uppercase">{selectedRecord.prediction}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase block text-[10px]">CONFIDENCE</span>
                  <strong className="text-foreground text-base font-black">{selectedRecord.confidence.toFixed(1)}%</strong>
                </div>
              </div>

              <span className="text-xs font-archivo font-bold text-muted-foreground uppercase tracking-widest block mb-3">
                SUBMITTED ATTRIBUTES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-archivo">
                {selectedRecord.inputs ? (
                  Object.entries(selectedRecord.inputs).map(([k, v]) => (
                    <div key={k} className="p-2.5 bg-background border border-border flex justify-between">
                      <span className="text-muted-foreground uppercase text-[10px]">{k.replace(/_/g, " ")}:</span>
                      <strong className="text-foreground">{v}</strong>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No feature inputs archived for this entry.</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
