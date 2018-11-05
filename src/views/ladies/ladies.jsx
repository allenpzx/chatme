import React from 'react';
import { connect } from 'react-redux';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import getLadies from '../../store/actions/ladies.js';

class Ladies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getLadies()
    }

    render() {
        const { ladies } = this.props;
        return (
            <WingBlank>
                {ladies instanceof Array && ladies.length > 0 && ladies.map(x => {
                    return (
                        <React.Fragment>
                            <WhiteSpace />
                            <Card>
                                <Card.Header
                                    title={x.account}
                                    thumb={x.avatar ? require(`../me/avatars/${x.avatar}.png`) : null}
                                    extra={<span>{x.gender}</span>}
                                />
                                <Card.Body>
                                    <div>{x.description ? x.description : null}</div>
                                </Card.Body>
                                <Card.Footer content={x.description ? x.description : null} extra={<div>{x.wanna ? x.wanna : null}</div>} />
                            </Card>
                            <WhiteSpace />
                        </React.Fragment>
                    )
                })}
            </WingBlank>
        )
    }
}

export default connect(
    state => ({
        ladies: state.ladies
    }),
    dispatch => ({
        getLadies: () => getLadies(dispatch)
    })
)(Ladies)