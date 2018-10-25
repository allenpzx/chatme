import React from 'react';
import { withRouter } from 'react-router-dom';

class RouterAnimation extends React.Component {
    state = {
        prevProps: this.props
    }

    static getDerivedStateFromProps(props, state) {
        if (!Object.is(props, state)) {
            return {
                props
            }
        }
        return null;
    }

    componentDidUpdate(props, state) {
        const box = this.box;
        const preKey = props.location.key;
        const key = this.props.location.key;
        const isUpdate = !Object.is(preKey, key);
        // ReactDOM.unmountComponentAtNode(box)
        // if(isUpdate){
        //     if(box.classList.contains('fadeIn')){
        //         box.classList.remove('fadeIn')
        //         console.log('remove');
        //         setTimeout(function (){
        //             box.classList.add('fadeIn')
        //             console.log('add async');

        //         }, 0)
        //     }else{
        //         box.classList.add('fadeIn')
        //         console.log('add')
        //     }
        // }

        console.log(React.Children);
        // React.Children.map(x=>{
        //     console.log(x);
        // })

        React.Children.map(this.props.children, element => console.log(element))

    }

    render() {
        return (
            <div ref={x => this.box = x} className='animated fadeIn'>
                {React.Children.map(this.state.child1, element =>
                    React.cloneElement(element, { ref: 'child1' }),
                )}
                {React.Children.map(this.state.child2, element =>
                    React.cloneElement(element, { ref: 'child2' }),
                )}
            </div>
        )
    }
}
export default withRouter(RouterAnimation);