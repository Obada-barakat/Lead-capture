import { Users, UserCheck, TrendingUp } from "lucide-react";

const AnalyticsCards = ({ leads }) => {
  //Calculate metics
  const totalLeads = leads.length;

  //count today's leads
  const today = new Date().toDateString();
  const todayLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.timestamp).toDateString();
    return leadDate === today;
  }).length;

  //calculate conversion rate
  const convertedLeads = leads.filter(
    (lead) => lead.status?.toLowerCase() === "converted",
  ).length;
  const conversionRate =
    totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Today's Leads",
      value: todayLeads,
      icon: UserCheck,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200 mb-1">{card.title}</p>
                <h3 className="text-3xl font-bold text-white">{card.value}</h3>
              </div>
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
              >
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default AnalyticsCards;
