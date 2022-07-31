import { useEffect, useState } from 'react';
import './App.css';
import CalculatorKey from './CalculatorKey';
import CalculatorDisplay from './CalculatorDisplay';


const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

function App() {
const [state, setState] = useState({
  value: null,
  displayValue: '0',
  operator: null,
  waitingForOperand: false
})

const {displayValue, waitingForOperand} = state

const clearAll = () => {
  setState({
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false
  })
}
const clearDisplay = () => {
  setState(prevState => ({
    ...prevState,
    displayValue: '0'
  }))
}

const toggleSign = () => {
  const newValue = parseFloat(displayValue) * -1
  setState({
    ...state,
    displayValue: String(newValue)
  })
}

const inputPercent = () => {
  const currentValue = parseFloat(displayValue)
    
  if (currentValue === 0)
    return
  
  const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
  const newValue = parseFloat(displayValue) / 100
  
  setState({
    ...state,
    displayValue: String(newValue.toFixed(fixedDigits.length + 2))
  })
}

const inputDigit = (digit) => {
  if (waitingForOperand) {
    setState({
      ...state, 
      displayValue: String(digit),
      waitingForOperand: false,
    })
  }
  else {
    state.displayValue === '0' ? setState({...state, displayValue: String(digit)}) : setState({...state, displayValue: displayValue + digit})
  }
}

const inputDot = () => {
  const { displayValue } = state
    
    if (!(/\./).test(displayValue)) {
      setState({...state, 
                displayValue: displayValue + '.',
                waitingForOperand: false
    })
    }
}

const clearLastChar = () => {
  setState({
    ...state,
    displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
  })
}
const performOperation = (nextOperator) => {
  const { value, displayValue, operator } = state
  const inputValue = parseFloat(displayValue)

  if (value == null) {
    setState({
      ...state,
      value: inputValue,
    });
  } else {
    if (operator) {
    
      const currentValue = value || 0
    
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
    
      console.log('before setState', state)
      setState({
        value: newValue,
        displayValue: String(newValue)
      })
      console.log('after setState', state)
    }
  }

  setState(prevState => ({
    ...prevState,
    waitingForOperand: true,
    operator: nextOperator
  }))

}

  return (
    <div className="app">
      <div className='calculator'>
        <CalculatorDisplay value={state.displayValue} />
        <div className='calculator-keypad'>
          <div className='input-keys'>
            <div className='function-keys'>
              <CalculatorKey className="key-clear" onPress={() => clearDisplay()}>AC</CalculatorKey>
              <CalculatorKey className="key-clear" onPress={() => clearAll()}>C</CalculatorKey>
              <CalculatorKey className="key-percent" onPress={() => inputPercent()}>%</CalculatorKey>
            </div>
            <div className='digit-keys'>
              <CalculatorKey className="key-sign" onPress={() => toggleSign()}>±</CalculatorKey>
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
