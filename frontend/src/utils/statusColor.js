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

export const getRoundResultColor = (result) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Pass: "bg-green-100 text-green-700",
    Fail: "bg-red-100 text-red-700",
  };

  return colors[result] || "bg-gray-100 text-gray-600";
};

export const getOfferStatusColor = (status) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return colors[status] || "bg-gray-100 text-gray-600";
};
