import React from 'react';
import { connect } from 'react-redux';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import getGentleman from '../../store/actions/gentleman.js';

class Gentleman extends React.Component {

    componentDidMount() {
        this.props.getGentleman()
    }

    render() {
        const { gentleman } = this.props;
        const ImgWrap = props => <div style={{width: '22px', height: '22px'}}>{props}</div>;
        return (
            <WingBlank>
                {gentleman instanceof Array && gentleman.length > 0 && gentleman.map(x => {
                    return (
                        x.avatar 
                        ? 
                        <React.Fragment>
                            <WhiteSpace />
                            <Card>
                                <Card.Header
                                    title={x.account}
                                    thumb={<ImgWrap>{x.avatar}</ImgWrap>}
                                    extra={<span>{x.gender}</span>}
                                />
                                <Card.Body>
                                    <div>{x.description ? x.description : null}</div>
                                </Card.Body>
                                <Card.Footer content={x.description ? x.description : null} extra={<div>{x.wanna ? x.wanna : null}</div>} />
                            </Card>
                            <WhiteSpace />
                        </React.Fragment>
                        : null
                    )
                })}
            </WingBlank>
        )
    }
}

export default connect(
    state => ({
        gentleman: state.gentleman
    }),
    dispatch => ({
        getGentleman: () => getGentleman(dispatch)
    })
)(Gentleman)