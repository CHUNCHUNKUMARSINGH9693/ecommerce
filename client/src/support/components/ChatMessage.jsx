import { Link } from 'react-router-dom';

const ChatMessage = ({ text }) => {
  // Simple regex to find [Text](Link)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = text.split(linkRegex);

  if (parts.length === 1) return <p>{text}</p>;

  // This renders the text with a clickable Link component
  return (
    <p>
      {parts.map((part, i) => {
        if (i % 3 === 1) {
          const linkText = part;
          const linkPath = parts[i + 1];
          return (
            <Link 
              key={i} 
              to={linkPath} 
              className="text-orange-500 underline font-bold hover:text-orange-600"
            >
              {linkText}
            </Link>
          );
        }
        if (i % 3 === 2) return null;
        return part;
      })}
    </p>
  );
};

export default ChatMessage;