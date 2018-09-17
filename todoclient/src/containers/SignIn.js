
import { connect } from 'react-redux'
import { signIn } from '../actions/UserActions'
import SignIn from '../components/SignIn'


const mapStateToProps = (state) => {
    return {
        email: state.user.email
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => {
            dispatch(signIn(email, password))
        }
    }
};

const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInContainer;
