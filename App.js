import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 


export default function App() { 
    const [displayValue, setDisplayValue] = useState('0'); 
    const [inputArray, setInputArray] = useState([]); 

    const handleNumberInput = (num) => { 
        if (displayValue === '0') { 
            setDisplayValue(num.toString()); 
        } else { 
            setDisplayValue(displayValue + num); 
        }
    }; 

    const handleOperatorInput = (operator) => { 
        setInputArray([...inputArray, displayValue, operator]);
        setDisplayValue('0');
    }; 

	const handlPlusMinus = () => {
		setDisplayValue(displayValue * -1);
	};

	const handlPercent = () => {
		setDisplayValue(displayValue / 100);
	};

    const handleEqual = () => { 
        const fullInput = [...inputArray, displayValue];
        const result = evaluateExpression(fullInput);
        setDisplayValue(result.toString()); 
        setInputArray([]); 
    }; 

    const evaluateExpression = (inputArray) => {
        // Convert strings to numbers and operators
        let expression = inputArray.map(item => {
            if (!isNaN(item)) {
                return parseFloat(item);
            }
            return item;
        });

        // Order of operations: first *, /, then +, -
        let operators = ['*', '/', '+', '-'];
        for (let operator of operators) {
            while (expression.includes(operator)) {
                const index = expression.findIndex(item => item === operator);
                const [left, op, right] = expression.slice(index - 1, index + 2);
                let result;
                switch (op) {
                    case '*':
                        result = left * right;
                        break;
                    case '/':
                        result = left / right;
                        break;
                    case '+':
                        result = left + right;
                        break;
                    case '-':
                        result = left - right;
                        break;
                }
                expression.splice(index - 1, 3, result);
            }
        }
        return expression[0];
    };

    const handleClear = () => { 
        setDisplayValue('0'); 
        setInputArray([]); 
    }; 

    return ( 
        <View style={styles.container}> 
            <View style={styles.displayContainer}> 
                <Text style={styles.displayText}> 
                    {displayValue} 
                </Text> 
            </View> 
            <View style={styles.buttonContainer}> 
                <View style={styles.row}> 
                    <TouchableOpacity style={styles.button} onPress={handleClear}> 
                        <Text style={styles.buttonText}>C</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handlPlusMinus('+-')}> 
                        <Text style={styles.buttonText}>+-</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handlPercent('%')}> 
                        <Text style={styles.buttonText}>%</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleOperatorInput('/')}> 
                        <Text style={styles.buttonText}>/</Text> 
                    </TouchableOpacity> 
                </View> 				
                <View style={styles.row}> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(7)}> 
                        <Text style={styles.buttonText}>7</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(8)}> 
                        <Text style={styles.buttonText}>8</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(9)}> 
                        <Text style={styles.buttonText}>9</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleOperatorInput('*')}> 
                        <Text style={styles.buttonText}>X</Text> 
                    </TouchableOpacity> 
                </View> 
                <View style={styles.row}> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(4)}> 
                        <Text style={styles.buttonText}>4</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(5)}> 
                        <Text style={styles.buttonText}>5</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(6)}> 
                        <Text style={styles.buttonText}>6</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={[styles.button, styles.button]} onPress={() => handleOperatorInput('-')}> 
                        <Text style={styles.buttonText}>-</Text> 
                    </TouchableOpacity> 
                </View> 
                <View style={styles.row}> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(1)}> 
                        <Text style={styles.buttonText}>1</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(2)}> 
                        <Text style={styles.buttonText}>2</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.button} onPress={() => handleNumberInput(3)}> 
                        <Text style={styles.buttonText}>3</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={[styles.button, styles.button]} onPress={() => handleOperatorInput('+')}> 
                        <Text style={styles.buttonText}>+</Text> 
                    </TouchableOpacity> 
                </View> 
                <View style={styles.row}> 
                    <TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(0)}> 
                        <Text style={styles.buttonText}>0</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput('.')}> 
                        <Text style={styles.buttonText}>.</Text> 
                    </TouchableOpacity> 
                    <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={handleEqual}> 
                        <Text style={styles.buttonText}>=</Text> 
                    </TouchableOpacity> 
                </View> 
            </View> 
        </View> 
    ); 
} 

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: '#3f4857', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 800,
        paddingTop: 50
    }, 
    displayContainer: { 
        justifyContent: 'flex-end', 
        alignItems: 'flex-end', 
        padding: 20, 
        backgroundColor: '#009b54',
        width: '95%',
        height: 120,
        borderRadius: 10
    }, 
    displayText: { 
        fontSize: 70, 
        color: '#ffffff',
    }, 
    buttonContainer: { 
        flex: 0, 
        width: '95%',
        marginTop: 20 
    }, 
    row: { 
        flex: 0, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 0, 
    }, 
    button: { 
        flex: 0, 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#e800ce', 
        marginTop: 10,
        height: 90,
        width: 90
    }, 
    buttonText: { 
        fontSize: 34, 
        color: '#ffffff', 
    },
    equalButton: { 
        backgroundColor: '#ff0006', 
        width: '50%'
    },
});