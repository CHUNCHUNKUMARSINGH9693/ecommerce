import OverviewCard from './OverviewCard';

const OverviewCards = () => {
  const stats = [
    { title: "Total Tasks", value: "154", sub: "Lifetime", color: "indigo" },
    { title: "Earned", value: "$420.50", sub: "This Month", color: "emerald" },
    { title: "Pending", value: "12", sub: "Awaiting Review", color: "amber" },
    { title: "Failed", value: "2", sub: "Rejected", color: "rose" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <OverviewCard key={i} {...s} />
      ))}
    </div>
  );
};

export default OverviewCards;