import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [prevNumber, setPrevNumber] = useState(null);
    const [currentOperation, setCurrentOperation] = useState(null);
    const [newNumberStarted, setNewNumberStarted] = useState(false);

    const handleNumber = (number) => {
        if (display === 'Error') {
            setDisplay(number);
            setNewNumberStarted(true);
            return;
        }
        
        if (display === '0' || !newNumberStarted) {
            setDisplay(number);
            setNewNumberStarted(true);
        } else {
            setDisplay(display + number);
        }
    };

    const handleOperation = (operation) => {
        if (display === 'Error') {
            return;
        }

        const currentNum = parseFloat(display);

        if (prevNumber === null) {
            setPrevNumber(currentNum);
        } else if (currentOperation) {
            const result = calculate(prevNumber, currentNum, currentOperation);
            setPrevNumber(result);
            setDisplay(String(result));
        }

        setCurrentOperation(operation);
        setNewNumberStarted(false);
    };

    const calculate = (a, b, operation) => {
        switch (operation) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                if (b === 0) {
                    setDisplay('Error');
                    setPrevNumber(null);
                    setCurrentOperation(null);
                    return 0;
                }
                return a / b;
            case '%':
                return (a * b) / 100;
            default:
                return b;
        }
    };

    const handleEquals = () => {
        if (currentOperation === null || prevNumber === null || !newNumberStarted) {
            return;
        }

        const currentNum = parseFloat(display);
        const result = calculate(prevNumber, currentNum, currentOperation);
        
        setDisplay(String(result));
        setPrevNumber(null);
        setCurrentOperation(null);
        setNewNumberStarted(false);
    };

    const handleClear = () => {
        setDisplay('0');
        setPrevNumber(null);
        setCurrentOperation(null);
        setNewNumberStarted(false);
    };

    const handleDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
            setNewNumberStarted(true);
        }
    };

    const handlePlusMinus = () => {
        if (display === '0' || display === 'Error') return;
        setDisplay(String(-parseFloat(display)));
    };

    return (
        <div className="calculator">
            <div className="display">{display}</div>
            <div className="buttons">
                <button onClick={handleClear} className="special">AC</button>
                <button onClick={handlePlusMinus} className="special">+/-</button>
                <button onClick={() => handleOperation('%')} className="special">%</button>
                <button onClick={() => handleOperation('÷')} className="operation">÷</button>

                <button onClick={() => handleNumber('7')}>7</button>
                <button onClick={() => handleNumber('8')}>8</button>
                <button onClick={() => handleNumber('9')}>9</button>
                <button onClick={() => handleOperation('×')} className="operation">×</button>

                <button onClick={() => handleNumber('4')}>4</button>
                <button onClick={() => handleNumber('5')}>5</button>
                <button onClick={() => handleNumber('6')}>6</button>
                <button onClick={() => handleOperation('-')} className="operation">-</button>

                <button onClick={() => handleNumber('1')}>1</button>
                <button onClick={() => handleNumber('2')}>2</button>
                <button onClick={() => handleNumber('3')}>3</button>
                <button onClick={() => handleOperation('+')} className="operation">+</button>

                <button onClick={() => handleNumber('0')} className="zero">0</button>
                <button onClick={handleDecimal}>.</button>
                <button onClick={handleEquals} className="operation">=</button>
            </div>
        </div>
    );
};

export default Calculator;
