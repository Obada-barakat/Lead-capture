// Centralized API configuration
const API_BASE_URL = "http://localhost:5678/webhook";

export const leadsAPI = {
  //Fetch all leads
  getLeads: async () => {
    const response = await fetch(`${API_BASE_URL}/get-leads`);

    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }
    const data = await response.json();
    return data.leads || [];
  },

  // Update lead status
  updateLeadStatus: async ({ email, status }) => {
    const response = await fetch(`${API_BASE_URL}/update-lead-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  },
};
