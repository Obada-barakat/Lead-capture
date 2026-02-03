import { useState } from "react";
import { Search, ChevronDown, Mail, Phone, Building } from "lucide-react";
import StatusBadge from "./StatusBadge";

const statuses = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
];

const LeadsTable = ({ leads, onUpdateStatus, isUpdating }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      lead.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (lead, newStatus) => {
    setOpenDropdown(null);
    await onUpdateStatus(lead.email, newStatus);
  };

  return (
    <article className="backdrop-blur-lg bg-white/10 rounded-xl border border-white/20 overflow-hidden">
      {/* Filter Bar */}
      <header className="p-6 border-b border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <label htmlFor="lead-search" className="sr-only">
              Search leads
            </label>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300"
              size={20}
              aria-hidden="true"
            />
            <input
              id="lead-search"
              type="search"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="sr-only">
              Filter by status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 "
            >
              {statuses.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                  className="bg-indigo-500 border-none"
                >
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-blue-200 mt-4" role="status">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
      </header>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th
                scope="col"
                className="text-left py-4 px-6 text-sm font-semibold text-blue-200"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-left py-4 px-6 text-sm font-semibold text-blue-200"
              >
                Contact
              </th>
              <th
                scope="col"
                className="text-left py-4 px-6 text-sm font-semibold text-blue-200"
              >
                Company
              </th>
              <th
                scope="col"
                className="text-left py-4 px-6 text-sm font-semibold text-blue-200"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-left py-4 px-6 text-sm font-semibold text-blue-200"
              >
                Date
              </th>
              <th
                scope="col"
                className="text-left py-4 px-6 text-sm font-semibold text-blue-200"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-blue-200">
                  {searchQuery || statusFilter !== "all"
                    ? "No leads match your filters"
                    : "No leads found"}
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-4 px-6">
                    <p className="text-white font-medium">{lead.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    <address className="not-italic space-y-1">
                      <div className="flex items-center gap-2 text-sm text-blue-200">
                        <Mail size={14} aria-hidden="true" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-blue-100"
                        >
                          {lead.email}
                        </a>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <Phone size={14} aria-hidden="true" />
                          <a
                            href={`tel:${lead.phone}`}
                            className="hover:text-blue-100"
                          >
                            {lead.phone}
                          </a>
                        </div>
                      )}
                    </address>
                  </td>
                  <td className="py-4 px-6">
                    {lead.company && (
                      <div className="flex items-center gap-2 text-sm text-blue-200">
                        <Building size={14} aria-hidden="true" />
                        {lead.company}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="py-4 px-6">
                    <time
                      dateTime={lead.timestamp}
                      className="text-sm text-blue-200"
                    >
                      {new Date(lead.timestamp).toLocaleDateString()}
                    </time>
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        disabled={isUpdating}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white flex items-center gap-2 transition disabled:opacity-50"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === index}
                      >
                        Update <ChevronDown size={16} />
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdown === index && (
                        <nav
                          className="absolute right-0 mt-2 w-40 bg-gray-800 border border-white/20 rounded-lg shadow-xl z-10"
                          role="menu"
                        >
                          {["new", "contacted", "converted"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusUpdate(lead, status)}
                              className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition"
                              role="menuitem"
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          ))}
                        </nav>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default LeadsTable;
