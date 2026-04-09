import ActionCard from './ActionCard';

const ActiveDealsCard = () => (
  <ActionCard 
    title="Active Deals" 
    description="Browse and claim available offers."
    icon="🏷️"
    bgColor="bg-blue-50"
    iconColor="text-blue-600"
    onClick={() => console.log('Deals clicked')}
  />
);

export default ActiveDealsCard;