import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../../history';
import Modal from '../Modal';
import { delectStream, fetchStream } from '../../actions';

class StreamDelect extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={() => this.props.delectStream(id)} className="ui primary button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    };

    renderContent = () => {
        const { stream } = this.props;
        if (!stream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete this stream: ${stream.title}?`;
    };
    
    render() {
        return <Modal 
            onDismiss = {() => history.push("/")}
            title = "Delete Stream"
            content = {this.renderContent()}
            actions = {this.renderActions()}
        />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { delectStream, fetchStream })(StreamDelect);