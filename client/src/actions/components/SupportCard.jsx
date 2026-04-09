import ActionCard from './ActionCard';

const SupportCard = () => (
  <ActionCard 
    title="24/7 Support" 
    description="Chat with us or open a ticket."
    icon="💬"
    bgColor="bg-rose-50"
    iconColor="text-rose-600"
    onClick={() => console.log('Support clicked')}
  />
);

export default SupportCard;