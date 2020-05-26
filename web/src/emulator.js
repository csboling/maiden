import React, { Component } from 'react';

class EmulatorEncoder extends Component {
  onWheel = event => {
    this.props.sendCommand({
      type: 'enc',
      index: this.props.index,
      value: event.deltaY,
    });
  };

  render() {
    return (
      <div
        onWheel={this.onWheel}>
        E{this.props.index}
      </div>
    );
  }
}

class EmulatorKey extends Component {
  onMouseDown = event => {
    this.props.sendCommand({
      type: 'keyDown',
      index: this.props.index,
    });
  };

  onMouseUp = event => {
    this.props.sendCommand({
      type: 'keyUp',
      index: this.props.index,
    });
  };

  render() {
    return (
      <button
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}>
        K{this.props.index}
      </button>
    );
  }
}

class EmulatedDevice extends Component {
  render() {
    const hwemu = this.props.hwemu.get(this.props.activeRepl);
    if (!hwemu) {
      return (
        <div className="emulator">no screen</div>
      );
    }

    const ioStyle = {
      flexDirection: 'row',
      display: 'flex',
    };
    const ioItemStyle = {
      flex: 'flex-grow',
    };

    const screen = hwemu.get('fb');
    const io = [1, 2, 3];

    return (
      <div className="emulator">
        <div style={ioStyle}>
          {io.map(ix => (
            <React.Fragment key={ix}>
              <EmulatorEncoder
                style={ioItemStyle}
                index={ix}
                sendCommand={this.props.sendCommand} />
              <EmulatorKey
                style={ioItemStyle}
                index={ix}
                sendCommand={this.props.sendCommand} />
            </React.Fragment>
          ))}
        </div>
        <img width="128" height="64" src={screen} alt="//// SCREEN" />
      </div>
    );
  }
}

class Emulator extends Component {

  sendCommand = command => {
    this.props.replSend(this.props.activeRepl, JSON.stringify(command));
  };

  render() {
    const style = {
      height: this.props.height,
      width: this.props.width,
    };

    let content;
    if (this.props.renderChild) {
      content = this.props.children;
    } else if (!this.props.hwemu) {
      content = <span>no screen output</span>
    } else {
      content = <EmulatedDevice
        activeRepl={this.props.activeRepl}
        hwemu={this.props.hwemu}
        sendCommand={this.sendCommand} />
    }

    return (
      <div className="repl" style={style}>
        {content}
      </div>
    );
  }
}

export default Emulator;
