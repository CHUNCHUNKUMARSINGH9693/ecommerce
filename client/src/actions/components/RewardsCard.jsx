import ActionCard from './ActionCard';

const RewardsCard = () => (
  <ActionCard 
    title="My Rewards" 
    description="Redeem points for cash or prizes."
    icon="🎁"
    bgColor="bg-purple-50"
    iconColor="text-purple-600"
    onClick={() => console.log('Rewards clicked')}
  />
);

export default RewardsCard;