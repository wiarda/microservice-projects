import {connect} from 'react-redux';
import ServerResponse from '../../../components/ServerResponse';
// import {clearInstructions, loadInstructions} from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    return {
        apiResponse: state.api.response
        ,parser: ownProps.parser
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         clearInstructions: () => dispatch(clearInstructions())
//         ,loadInstructions: (body) => dispatch(loadInstructions(body))
//     };
// };

const ServerResponseContainer = connect(mapStateToProps)(ServerResponse);
export default ServerResponseContainer;

