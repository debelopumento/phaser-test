import React, { PureComponent } from 'react';
import * as actions from './actions/actionIndex';
import store from './store';

export default class Registration extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            screenName: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const newPlayer = {
            facebookId: store.getState().facebookId,
            screenName: this.state.screenName,
        };
        store.dispatch(actions.newPlayerRegistration(newPlayer));
    }

    handleChange(event) {
        const screenName = event.target.value;
        this.setState({ screenName: screenName });
    }

    render() {
        return (
            <div>
                <p>Please enter a screen name</p>
                <input type="text" onChange={this.handleChange} />
                <input
                    type="submit"
                    value="submit"
                    onClick={this.handleSubmit}
                />
            </div>
        );
    }
}
