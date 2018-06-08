import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import PowerStateList from './PowerStateList';
import CommandHistory from './CommandHistory';

const styles = theme => ({
  root: {
    margin: 0,
    width: '100%',
  },
});

@withStyles(styles)
class App extends React.Component {
  constructor(props) {
    super(props)
    //ここで定義しないとstateが更新されてもコンポーネントが更新されない
    this.state = {
      power: {},
      irLog: []
    };
  }

  componentDidMount() {
    const socket = io.connect('http://siro.nov:8888', { path: '/api' });
    socket.on("receiveMessage", (messages) => {
      console.log("received power data");
      console.log(messages);
      let json = JSON.parse(messages);
      let preState = this.state.power;
      preState[json.name] = { power: json.power, key: json.name, open: false };
      this.setState({ power: preState });
    })
    socket.on('ir', msg => {
      let json = JSON.parse(msg);
      let preState = this.state.irLog;
      preState.push(json);
      this.setState({ irLog: preState });
    });
    this.setState({ socket: socket });

    axios
      .get('/power')
      .then(results => {
        const data = results.data;
        const state = {};
        Object.keys(data).forEach((key) => {
          console.log(key);
          state[key] = { power: data[key], name: key, open: false };
        })
        this.setState({ power: state });
      });
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  handleToggle(value) {
    console.log(`App:handleToggle ${value}`);
    this.state.socket.emit("toggle", value);
  };

  handleChangeState(value) {
    console.log(`App:handleChangeState ${value}`);
    this.state.socket.emit("changeState", value);
  }

  render() {
    console.log("App:render");

    return (
      <Grid container className={this.props.classes.root}>
        <Grid item xs={4}>
          <PowerStateList
            power={this.state.power}
            handleToggle={this.handleToggle.bind(this)}
            handleChangeState={this.handleChangeState.bind(this)} />
        </Grid>
        <Grid item xs={8}>
          <CommandHistory irLog={this.state.irLog} />
        </Grid>
      </Grid>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
