import React from 'react'
import { useSelector } from "react-redux";
import LoaderComponent from '../screens/common/components/Loader'
const  Loading = (Component, loadingMsg = "Loading...") => {
    function HOC(props){
        const isLoading = useSelector(state => state.ui.loading)
        return (
            <>
            {isLoading ? <LoaderComponent loadingMsg={loadingMsg} /> : <></>}
            <Component />
            </>
        );
    }
    return HOC;
}

export default Loading;