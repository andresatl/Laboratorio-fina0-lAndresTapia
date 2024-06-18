import React from 'react';

const UnsafeComponent: React.FC = () => {
  const userInput = '<script>alert("Vulnerable!");</script>';

  return (
    <div dangerouslySetInnerHTML={{ __html: userInput }} />
  );
};

export default UnsafeComponent;
