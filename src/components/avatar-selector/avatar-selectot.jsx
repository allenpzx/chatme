import React from 'react';
import {connect} from 'react-redux';
import { Grid } from 'antd-mobile';
import {selectAvatar} from '../../store/actions/user.js';

class AvatarSelector extends React.Component{
    render(){
        const avatarList = 'man1,man2,man3,man4,man5,women1,women2,women3,women4,women5'.split(',').map(x=>({
            icon: require(`./avatars/${x}.png`),
            text: x,
        }))
        return <Grid data={avatarList} columnNum={5} onClick={ele=>this.props.selectAvatar(ele.text)} />
    }
}

export default connect(
    state=>({

    }),
    dispatch=>({
        selectAvatar: name=>selectAvatar(dispatch)(name)
    })
)(AvatarSelector)