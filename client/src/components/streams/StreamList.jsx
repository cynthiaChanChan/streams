import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (userId) => {
        const { isSignedIn, currentUserId } = this.props;
        if (isSignedIn && currentUserId === userId) {
            return (
                <div className="right floated content">
                    <button className="ui button primary">Edit</button>
                    <button className="ui button negative">Delete</button>
                </div>
            );
        }
    };

    renderList = () => {
        return this.props.streams.map(({id, title, description, userId}) => {
            return (
                <div className="item" key={id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {title}
                        <div className="description">{description}</div>
                    </div>
                    {this.renderAdmin(userId)}
                </div>
            );
        });
    };

    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }

}

const mapStateToProps = ({streams, auth}) => {
    return { 
        streams: Object.values(streams),
        isSignedIn: auth.isSignedIn,
        currentUserId: auth.userId
    }
};

export default connect(mapStateToProps, {  fetchStreams })(StreamList);