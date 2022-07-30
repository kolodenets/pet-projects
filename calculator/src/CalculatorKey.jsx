import React from 'react';

const CalculatorKey = ({className, ...props}) => {
  return (
    <button className={`calculator-key ${className}`} {...props}/>
  );
};

export default CalculatorKey;