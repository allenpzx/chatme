import React from 'react';
import { connect } from 'react-redux';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import getMatchList from '../../store/actions/match-list.js';

@connect(
    state=>({
        matchList: state.matchList
    }),
    dispatch => ({
        getMatchList: () => getMatchList(dispatch)
    })
)

class MatchList extends React.Component {

    componentDidMount() {
        this.props.getMatchList()
    }

    render() {
        const { matchList } = this.props;
        return (
            <WingBlank>
                {matchList instanceof Array && matchList.length > 0 && matchList.map(x => {
                    return (
                        <React.Fragment key={x.account}>
                            <WhiteSpace />
                            <Card onClick={()=>this.props.history.push(`/chat/${x._id}`)}>
                                <Card.Header
                                    title={x.account}
                                    thumb={x.avatar ? <img style={{width: '22px', height: '22px'}} src={x.avatar} alt='avatar'/> : null}
                                    extra={<span>{x.gender}</span>}
                                />
                                <Card.Body>
                                    <div>{x.description ? x.description : null}</div>
                                </Card.Body>
                                <Card.Footer content={x.wanna ? x.wanna : null} extra={<div>{x.age ? x.age : null}</div>} />
                            </Card>
                            <WhiteSpace />
                        </React.Fragment>
                    )
                })}
            </WingBlank>
        )
    }
}

export default MatchList