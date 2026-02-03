import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, AlertCircle, LogOut } from "lucide-react";
import AnalyticsCards from "./AnalyticsCards";
import LeadsTable from "./LeadsTable";
import { leadsAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  //Fetch leads using Tanstack Query
  const {
    data: leads = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: leadsAPI.getLeads,
  });

  //Update lead status mutation
  const updateStatusMutation = useMutation({
    mutationFn: leadsAPI.updateLeadStatus,

    //Optimistic update
    onMutate: async ({ email, status }) => {
      //cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["leads"] });

      ///snapshot previous value
      const previousLeads = queryClient.getQueryData("leads");

      //Optimistically update
      queryClient.setQueryData(["leads"], (old) =>
        old?.map((lead) => (lead.email === email ? { ...lead, status } : lead)),
      );

      //Return context with snapshot
      return { previousLeads };
    },

    //On error, rollback
    onError: (err, variables, context) => {
      queryClient.setQueryData(["leads"], context.previousLeads);
      console.error("Failed to update status:", err);
    },

    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  //Handle status update
  const handleUpdateStatus = (email, status) => {
    updateStatusMutation.mutate({ email, status });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <section className="text-center">
          <div
            className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"
            role="status"
            aria-label="Loading"
          ></div>
          <p className="text-white text-lg">Loading leads...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Lead Dashboard
            </h1>
            <p className="text-blue-200">Manage and track your leads</p>
          </div>
          <div>
            {/*Logout button*/}
            <button
              onClick={logout}
              className="mb-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg text-red-200 hover:text-red-100 flex items-center gap-2 transition"
              aria-label="Logout"
            >
              <LogOut size={18} />
              Logout
            </button>

            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white flex items-center gap-2 transition disabled:opacity-50"
              aria-label="Refresh leads"
            >
              <RefreshCw
                size={18}
                className={isFetching ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </header>

        {/* Error Message */}
        {isError && (
          <aside
            className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center gap-3"
            role="alert"
          >
            <AlertCircle className="text-red-300" size={20} />
            <p className="text-red-200">
              Error: {error?.message || "Failed to load leads"}
            </p>
          </aside>
        )}

        {/* Main Content */}
        <main>
          {/* Analytics Section */}
          <section aria-labelledby="analytics-heading">
            <h2 id="analytics-heading" className="sr-only">
              Lead Analytics
            </h2>
            <AnalyticsCards leads={leads} />
          </section>

          {/* Leads Table Section */}
          <section aria-labelledby="leads-heading">
            <h2 id="leads-heading" className="sr-only">
              All Leads
            </h2>
            <LeadsTable
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              isUpdating={updateStatusMutation.isPending}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
