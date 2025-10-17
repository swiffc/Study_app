import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  text: string;
  author?: string;
}

export const AnimatedQuote: React.FC<Props> = ({ text, author }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`my-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="relative bg-gradient-to-br from-accent-50 via-white to-primary-50 rounded-2xl p-8 border-l-4 border-accent-500 shadow-lg">
        <Quote className="absolute top-4 left-4 text-accent-300" size={40} />
        <div className="pl-12">
          <p className="text-xl text-gray-800 font-medium italic leading-relaxed mb-4">
            "{text}"
          </p>
          {author && (
            <p className="text-sm text-gray-600 font-semibold">
              — {author}
            </p>
          )}
        </div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-accent-400 to-primary-500 rounded-full opacity-20 blur-xl"></div>
      </div>
    </div>
  );
};
