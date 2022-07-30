import React from 'react';
import AutoScalingText from './AutoScalingText';

const CalculatorDisplay = ({value, ...props}) => {
  let formattedValue = parseFloat(value).toLocaleString('en-US', {
    useGrouping: true,
    maximumFractionDigits: 6
  })

  const match = value.match(/\.\d*?(0*)$/)
    
    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]
    
    return (
      <div {...props} className="calculator-display">
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </div>)
};

export default CalculatorDisplay;