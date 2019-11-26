import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = stream => {
        if (this.props.isSignedIn && stream.userId === this.props.currentId) {
            return (
                <div className="stream__icons">
                    <Link to={`/streams/edit/${stream.id}`}>
                        <svg className="stream__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M404.3 86l-202 202c-1.5 1.5-2.3 3.5-2.3 5.6v26.5c0 4.4 3.6 7.9 7.9 7.9h26.3c2.1 0 4.2-.8 5.7-2.3l202.1-202c3.1-3.1 3.1-8.1 0-11.2L415.5 86c-3.1-3.1-8.1-3.1-11.2 0zM475.6 67l-14.4-14.4-.2-.2c-3.1-2.7-7.2-4.4-11.5-4.4-4.4 0-8.5 1.7-11.6 4.5l-11.3 11.4c-1.5 1.6-1.5 4.1 0 5.6L437 79.9l21.7 21.7c1.6 1.6 4.1 1.6 5.7 0l11.3-11.3c2.8-3.1 4.4-7.1 4.4-11.6-.1-4.4-1.7-8.6-4.5-11.7z"/><g><path d="M250 342c-3 3-7.1 4.7-11.3 4.7H197.3c-8.8 0-16-7.2-16-16V289.2c0-4.2 1.7-8.3 4.7-11.3l.8-.8 147.6-147.6c2.5-2.5.7-6.8-2.8-6.8H90.7C58.3 122.7 32 149 32 181.4v224c0 32.4 26.3 58.7 58.7 58.7h256c32.4 0 58.7-26.3 58.7-58.7v-209c0-3.6-4.3-5.3-6.8-2.8L250.8 341.2l-.8.8z"/></g></svg>
                    </Link>
                    <Link to={`/streams/delect/${stream.id}`}>
                        <svg className="stream__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M133.1 128l23.6 290.7c0 16.2 13.1 29.3 29.3 29.3h141c16.2 0 29.3-13.1 29.3-29.3L379.6 128H133.1zm61.6 265L188 160h18.5l6.9 233h-18.7zm70.3 0h-18V160h18v233zm52.3 0h-18.6l6.8-233H324l-6.7 233zM364 92h-36l-26.3-23c-3.7-3.2-8.4-5-13.2-5h-64.8c-4.9 0-9.7 1.8-13.4 5L184 92h-36c-17.6 0-30 8.4-30 26h276c0-17.6-12.4-26-30-26z"/></svg>
                    </Link>
                </div>
            );
        }
    };

    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div className="stream__create">
                    <Link to='streams/new' className="btn">Create New Stream</Link>
                </div>
            )
        }
    };

    renderList = () => {
        return  this.props.streams.map( stream => {
            return (
                <li className="stream__item" key={stream.id}>
                    <div className="stream__wrapper">
                        <Link
                        to={`/streams/${stream.id}`}
                        className="stream__media"
                        style={{ backgroundImage: 'url(img/sofa.jpeg)' }}
                        >
                        </Link>
                        <div className="stream__content">
                            <div className="stream__meta">
                                <Link to={`/streams/${stream.id}`} className="stream__title">
                                    {stream.title}
                                </Link>
                                {/* <div className="stream__info">{stream.description}</div> */}
                            </div>
                            {this.renderAdmin(stream)}
                        </div>
                    </div>
                </li>
            );
        });
    };

    render() {
        return (
            <div className="container">
                <h2 className="heading-2">Streams</h2>
                <ul className="stream__list row">
                    {this.renderList()}
                </ul>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        streams: Object.values(state.streams),
        currentId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);