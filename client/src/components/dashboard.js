import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {fetchProtectedData, testAction, postTodo, searchGiphs} from '../actions/protected-data';
import { bindActionCreators } from 'redux'


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
                <button onClick={this.props.testAction}>testAction</button>
                <button onClick={() => this.props.postTodo({'title':'heyo'})}>postTodo</button>
                <button onClick={this.props.searchGiphs}>Search Giphs</button>{this.props.test}{this.props.animal}{this.props.name}
              //  {this.props.giphs.map((g)=>{ <iframe src="https://giphy.com/embed/1Lxha1YCyRoXu" width="480" height="460" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> })}
              {this.props.giphs.map((g)=>{return <h1>{g}</h1>})}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
        testAction, postTodo, searchGiphs
}, dispatch)

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    console.log(state);
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        protectedData: state.protectedData.data,
        name: state.protectedData.name,
        giphs: state.protectedData.giphs,
        test: state.protectedData.test,
        animal: state.protectedData.animal
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
