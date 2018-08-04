import React from 'react'
import { connect} from 'react-redux'
import Loading from '../../../components/Loading'

const mapStateToProps = state => {
    console.log("loading container", state)
    return {
        isLoading: state.display.isLoading
        ,message: state.display.loadingMessage
    }
}

const LoadingContainer = connect(mapStateToProps,null)(Loading)
export default LoadingContainer