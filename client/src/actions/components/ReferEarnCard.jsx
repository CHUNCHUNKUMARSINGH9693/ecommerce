import ActionCard from './ActionCard';

const ReferEarnCard = () => (
  <ActionCard 
    title="Refer & Earn" 
    description="Earn $10 for every friend invited."
    icon="👥"
    bgColor="bg-emerald-50"
    iconColor="text-emerald-600"
    onClick={() => console.log('Referral clicked')}
  />
);

export default ReferEarnCard;