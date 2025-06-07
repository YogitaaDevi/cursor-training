import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LegacyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount
    };
    this.increment = this.increment.bind(this);
  }

  componentDidMount() {
    // Legacy: side effects here
    console.log('Component mounted');
  }

  componentWillReceiveProps(nextProps) {
    // Legacy: update state based on new props
    if (nextProps.initialCount !== this.props.initialCount) {
      this.setState({ count: nextProps.initialCount });
    }
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
    if (this.props.onIncrement) {
      this.props.onIncrement(this.state.count + 1);
    }
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

LegacyCounter.propTypes = {
  initialCount: PropTypes.number,
  onIncrement: PropTypes.func
};

LegacyCounter.defaultProps = {
  initialCount: 0,
  onIncrement: () => {}
};

export default LegacyCounter;