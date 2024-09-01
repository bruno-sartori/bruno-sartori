import React from 'react';

interface ComponentProps {
  type?: 'default' | 'info' | 'warning' | 'error';
  children: JSX.Element;
}

const Callout: React.FC<ComponentProps> = ({ type = 'default', children }) => {
  let emoji = '💡';

  if (type === 'info') {
    emoji = 'ℹ️';
  } else if (type === 'warning') {
    emoji = '⚠️';
  } else if (type === 'error') {
    emoji = '🚨';
  }

  return (
    <div className={`not-prose callout callout-${type}`}>
      <span className="emoji pointer-events-none select-none">{emoji}</span>
      {children}
    </div>
  );
};

export default Callout;
