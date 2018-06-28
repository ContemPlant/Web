import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Calendar extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        onSelect: this.props.onSelect,
        today: new Date()
      }
    }

      render() {

        return (
          <div>
          <InfiniteCalendar
            width={300}
            height={300}
            min={new Date(2018, 0, 1)}
            max={this.state.today}
            maxDate={this.state.today}
            onSelect={e => this.state.onSelect(e)}
          />,
          </div>
        );
  }
}
export default Calendar
