import React from 'react';
import { Router, Route } from 'react-router-dom';

import '../sass/app.scss';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelect from './streams/StreamDelect';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';


class App extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header />
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams/new/" exact component={StreamCreate} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/delect/:id" exact component={StreamDelect} />
                        <Route path="/Streams/show/:id" exact component={StreamShow} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;