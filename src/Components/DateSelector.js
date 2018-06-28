import React from 'react';
import { Container, Accordion, Icon, Segment, Grid } from 'semantic-ui-react'

import Calendar from './Calendar'

class DateSelector extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        setFirstDate: this.props.setFirstDate,
        setSecondDate: this.props.setSecondDate,
        activeIndex: 1
      }
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }


      render() {

        return (
          <div>
            <Container >
              <Segment attached>
                <Accordion>
                  <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
                    <Icon name='calendar outline' />
                    Choose a period of time
                  </Accordion.Title>
                  <Accordion.Content active={this.state.activeIndex === 0}>
                    <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <h2> FROM </h2>
                      </Grid.Column>
                      <Grid.Column>
                        <h2> TO </h2>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <Calendar onSelect={this.state.setFirstDate.bind(this)} />
                      </Grid.Column>
                      <Grid.Column>
                        <Calendar onSelect={this.state.setSecondDate.bind(this)} />
                      </Grid.Column>
                      </Grid.Row>
                    </ Grid>
                  </Accordion.Content>
                </Accordion>
              </Segment>
            </ Container>
          </div>
        );
  }
}
export default DateSelector
