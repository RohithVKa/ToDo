
import {connect} from 'react-redux'
import {signUp} from '../actions/UserActions' 
import SignUp from '../components/SignUp'


const mapStateToProps = (state) => {
    return {
        email: state.user.email
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp:(email, password)=>{ 
            dispatch(signUp(email, password))
        }
    }
};

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpContainer;
