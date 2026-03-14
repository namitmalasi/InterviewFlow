export const getStatusColor = (status) => {
  const colors = {
    Applied: "bg-blue-100 text-blue-600",
    OA: "bg-purple-100 text-purple-600",
    Interview: "bg-yellow-100 text-yellow-600",
    Offer: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return colors[status] || "bg-gray-100 text-gray-600";
};
