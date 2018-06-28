import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Calendar extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        onSelect: this.props.onSelect,
        today: new Date(),
        selected: {
          start: '',
          end: ''
        }
      }
    }

      render() {

        return (
          <div>
          <InfiniteCalendar
            width={300}
            height={300}
            selected={this.state.today}
            maxDate={this.state.today}
            onSelect={e => this.state.onSelect(e)}
          />,
          </div>
        );
  }
}
export default Calendar
