function Calculator() {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState(null);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput('');
    setResult(null);
  };

  const calculate = () => {
    try {
      const res = eval(input);
      setResult(res);
    } catch {
      setResult('Hibás kifejezés');
    }
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    fontSize: '20px',
    margin: '5px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer'
  };

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: '#f39c12',
    color: 'white'
  };

  const displayStyle = {
    fontSize: '24px',
    marginBottom: '10px',
    minHeight: '30px'
  };

  const containerStyle = {
    display: 'inline-block',
    padding: '20px',
    border: '2px solid black',
    borderRadius: '10px',
    backgroundColor: '#f1f1f1'
  };

  const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

  return React.createElement('div', { style: containerStyle },
    React.createElement('h2', null, 'Számológép'),
    React.createElement('div', { style: displayStyle }, input || '0'),
    result !== null && React.createElement('div', { style: displayStyle }, 'Eredmény: ' + result),
    React.createElement('div', null,
      ['0','1','2','3','4','5','6','7','8','9',].map((char, i) =>
        React.createElement('button', {
          key: i,
          style: buttonStyle,
          onClick: () => handleClick(char)
        }, char)
      ),
      ['+','-','*','/'].map((op, i) =>
        React.createElement('button', {
          key: 'op' + i,
          style: operatorStyle,
          onClick: () => handleClick(op)
        }, op)
      )
    ),
    React.createElement('div', null,
      React.createElement('button', {
        onClick: clearInput,
        style: { ...buttonStyle, backgroundColor: '#e74c3c', color: 'white', width: '130px' }
      }, 'Törlés'),
      React.createElement('button', {
        onClick: calculate,
        style: { ...buttonStyle, backgroundColor: '#2ecc71', color: 'white', width: '130px' }
      }, '=')
    )
  );
}
