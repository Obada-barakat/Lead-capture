const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "converted":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}
    >
      {status || "unknown"}
    </span>
  );
};

export default StatusBadge;
