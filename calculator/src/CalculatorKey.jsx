import React from 'react';

const CalculatorKey = ({className, onPress, ...props}) => {
  return (
    <button className={`calculator-key ${className}`} onClick={onPress} {...props}/>
  );
};

export default CalculatorKey;