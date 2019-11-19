import React from 'react';
import { connect } from 'react-redux';

import { fetchAuth } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '285537194405-m5itklnilcuin36qesavtl9sdc9o432j.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange();
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        const isSignedIn = this.auth.isSignedIn.get();
        const userId = isSignedIn ? this.auth.currentUser.get().getId() : null;
        this.props.fetchAuth(isSignedIn, userId);
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        const { isSignedIn } = this.props;
        
        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn) {
            return (
                <button onClick = {this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick = {this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            );
        }
    }
    
    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { fetchAuth })(GoogleAuth);