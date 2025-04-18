function RockPaperScissors() {
  const choices = ['Kő', 'Papír', 'Olló'];
  const [playerChoice, setPlayerChoice] = React.useState(null);
  const [computerChoice, setComputerChoice] = React.useState(null);
  const [result, setResult] = React.useState('');

  const playGame = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult('Döntetlen!');
    } else if (
      (choice === 'Kő' && compChoice === 'Olló') ||
      (choice === 'Papír' && compChoice === 'Kő') ||
      (choice === 'Olló' && compChoice === 'Papír')
    ) {
      setResult('Nyertél!');
    } else {
      setResult('Vesztettél!');
    }
  };

  const buttonStyle = {
    width: '100px',
    height: '60px',
    fontSize: '18px',
    margin: '10px',
    borderRadius: '8px',
    cursor: 'pointer'
  };

  return React.createElement('div', { style: { textAlign: 'center', marginTop: '30px' } },
    React.createElement('h2', null, 'Kő – Papír – Olló'),
    React.createElement('div', null,
      choices.map((choice, i) =>
        React.createElement('button', {
          key: i,
          style: buttonStyle,
          onClick: () => playGame(choice)
        }, choice)
      )
    ),
    playerChoice && React.createElement('p', null, `Te: ${playerChoice}`),
    computerChoice && React.createElement('p', null, `Gép: ${computerChoice}`),
    result && React.createElement('h3', null, result)
  );
}
