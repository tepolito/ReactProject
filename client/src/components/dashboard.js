import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {fetchProtectedData, searchGiphs} from '../actions/protected-data';
import {getTodos, postTodo} from '../actions/todos';
import { bindActionCreators } from 'redux';


export class Dashboard extends React.Component {
    componentDidMount() {
      console.log(this.props);
        if (!this.props.loggedIn) {
            return;
        }
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="dashboard" >
                <br />
                <div className="dashboard-username">
                    Email: {this.props.email}
                </div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
                <br />
                <Link to="/add">Add Entry</Link>
                <button onClick={this.props.getTodos}>testAction</button>
                <button onClick={() => this.props.postTodo({'title':'heyo'})}>postTodo</button>
                <button onClick={this.props.searchGiphs}>Search Giphs</button>{this.props.test}
              //  {this.props.giphs.map((g)=>{ <iframe src="https://giphy.com/embed/1Lxha1YCyRoXu" width="480" height="460" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> })}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
        getTodos, postTodo, searchGiphs
}, dispatch)

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    console.log(currentUser);
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        protectedData: state.protectedData.data,
        giphs: state.protectedData.giphs,
        test: state.protectedData.test
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
