import React from 'react';
import { connect } from 'react-redux';

import { fetchAuth } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: "285537194405-m5itklnilcuin36qesavtl9sdc9o432j.apps.googleusercontent.com",
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange();
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    onAuthChange = () => {
        const isSignedIn = this.auth.isSignedIn.get();
        const userId = isSignedIn ? this.auth.currentUser.get().getId() : null;
        this.props.fetchAuth(isSignedIn, userId);
    }
 
    renderAuthButton() {
        const { isSignedIn } = this.props;
        if(isSignedIn === null) {
            return null
        } else if (isSignedIn) {
            return (
                <button className="btn" onClick={this.onSignOutClick}>
                    Sign out
                </button>
            );
        } else {
            return (
                <button className="btn btn--secondary" onClick={this.onSignInClick}>
                    Sign in with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { fetchAuth })(GoogleAuth);