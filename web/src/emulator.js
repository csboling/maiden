import React, { Component } from 'react';

class Emulator extends Component {

  render() {
    const hwemu = this.props.hwemu.get(this.props.activeRepl);
    const style = {
      height: this.props.height,
      width: this.props.width,
    };

    const screen = hwemu.get('fb');
    return (
      <div className="repl" style={style}>
        <img width="128" height="64" src={screen} alt="//// SCREEN" />
      </div>
    );
  }
}

export default Emulator;
