import { useState } from 'react';
import './App.css';
import CalculatorKey from './CalculatorKey';
import CalculatorDisplay from './CalculatorDisplay';

function App() {
const [displayValue, setDisplayValue] = useState('0')



const inputDigit = (digit) => {
 return displayValue === '0' ? setDisplayValue(String(digit)) : setDisplayValue(prev => prev + digit)
}
const inputDot = (digit) => {
  
}
const performOperation = (sign) => {
  
}
  return (
    <div className="app">
      <div className='calculator'>
        <CalculatorDisplay value={displayValue} />
        <div className='calculator-keypad'>
          <div className='input-keys'>
            <div className='function-keys'>
              <button className='calculator-key key-clear'>C</button>
              <button className='calculator-key key-sign'>±</button>
              <button className='calculator-key key-percent'>%</button>
            </div>
            <div className='digit-keys'>
              <CalculatorKey className="key-0" onPress={() => inputDigit(0)}>0</CalculatorKey>
              <CalculatorKey className="key-dot" onPress={() =>inputDot()}>●</CalculatorKey>
              <CalculatorKey className="key-1" onPress={() =>inputDigit(1)}>1</CalculatorKey>
              <CalculatorKey className="key-2" onPress={() =>inputDigit(2)}>2</CalculatorKey>
              <CalculatorKey className="key-3" onPress={() =>inputDigit(3)}>3</CalculatorKey>
              <CalculatorKey className="key-4" onPress={() =>inputDigit(4)}>4</CalculatorKey>
              <CalculatorKey className="key-5" onPress={() =>inputDigit(5)}>5</CalculatorKey>
              <CalculatorKey className="key-6" onPress={() =>inputDigit(6)}>6</CalculatorKey>
              <CalculatorKey className="key-7" onPress={() =>inputDigit(7)}>7</CalculatorKey>
              <CalculatorKey className="key-8" onPress={() =>inputDigit(8)}>8</CalculatorKey>
              <CalculatorKey className="key-9" onPress={() =>inputDigit(9)}>9</CalculatorKey>
            </div>
          </div>
          <div className='operator-keys'>
            <CalculatorKey className="key-divide" onPress={() =>performOperation('/')}>÷</CalculatorKey>
            <CalculatorKey className="key-multiply" onPress={() =>performOperation('*')}>×</CalculatorKey>
            <CalculatorKey className="key-subtract" onPress={() =>performOperation('-')}>−</CalculatorKey>
            <CalculatorKey className="key-add" onPress={() =>performOperation('+')}>+</CalculatorKey>
            <CalculatorKey className="key-equals" onPress={() =>performOperation('=')}>=</CalculatorKey>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
