import ActionCard from './ActionCard';

const SamplesCard = () => (
  <ActionCard 
    title="View Samples" 
    description="Check guidelines and examples."
    icon="🖼️"
    bgColor="bg-orange-50"
    iconColor="text-orange-600"
    onClick={() => console.log('Samples clicked')}
  />
);

export default SamplesCard;