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
        const ImgWrap = props => <div style={{width: '22px', height: '22px'}}>{this.props.children}</div>;
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
                                    thumb={<img style={{width: '22px', height: '22px'}} src={x.avatar} />}
                                    extra={<span>年龄: {x.age}</span>}
                                />
                                <Card.Body>
                                    <div>{x.description ? x.description : null}</div>
                                </Card.Body>
                                <Card.Footer content={`${x.wanna ? x.wanna : null}`} />
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