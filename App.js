import React, { Component } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
function Square(props){
  return(
    <Pressable style={styles.square} onPress={props.onPress}>
      <Text style={styles.squareContent}>{props.value}</Text>
    </Pressable> 
  );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state={
      squares: Array(9).fill(null),
      xTurn: true,
    }
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xTurn ? 'X' : 'O';
    this.setState({
      squares: squares,
      xTurn: !this.state.xTurn,
    });
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onPress={() => this.handleClick(i)}/>;
  }
  
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Game over!';
      alert('The winner is ' + winner);
    }
    else {
      if(this.state.squares.includes(null)){
        status = 'Next player: ' + (this.state.xTurn ? 'X':'O');
      }
      else{
        status = 'Game over!';
        alert('Tie!');
      }
    }
    const restart = () => {
      this.setState({
        squares: Array(9).fill(null),
        xTurn: !this.state.xTurn,
      })
    }
    return (
      <View style={styles.board}>
        <View style={styles.row}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
        <Text style={styles.status}>{status}</Text>
        <Button onPress={restart} title="Play Again"/>
      </View>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Tic tac toe</Text>
        <Board/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    borderColor: '#000000',
    borderWidth: 3,
    height: 80,
    width: 80,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareContent: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  board:{
    margin: 30,
  },
  row: {
    flexDirection:'row',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  status: {
    marginVertical: 10,
    fontSize: 20,
  }
});
