import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }
    
    buildPlayer = () => {
        
        if (this.flvPlayer || !this.props.stream) {
            return;
        }
        const { id } = this.props.match.params;
        this.flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.flvPlayer.destroy();
    }

    render() {
        const { stream } = this.props;

        if (!stream) {
            return <div>Loading...</div>
        }
        return (
            <div className="container">
                <video ref={this.videoRef} controls/>
                <h1>{stream.title}</h1>
                <h5>{stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);