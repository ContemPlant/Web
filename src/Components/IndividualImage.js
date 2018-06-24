import React from 'react';
import {Helmet} from "react-helmet";

class IndividualImage extends React.Component {

	constructor(props) {
            super(props);
            this.state = {
              plantId: this.props.id
			};
		}


    render() {

        return (
        	<div>
            <Helmet>
              <script src="https://cdn.jsdelivr.net/npm/jdenticon@2.1.0" async></script>
            </Helmet>
            	<svg width="80" height="80" data-jdenticon-value={this.state.plantId}></svg>
			    </div>
        )
    }
}

export default IndividualImage;
