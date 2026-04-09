import ActionCard from './ActionCard';

const TermsCard = () => (
  <ActionCard 
    title="Policy & Terms" 
    description="Read our latest terms of service."
    icon="📜"
    bgColor="bg-slate-50"
    iconColor="text-slate-600"
    onClick={() => console.log('Terms clicked')}
  />
);

export default TermsCard;