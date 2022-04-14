import React, {Component} from 'react';

class AllAttendantRate extends Component{
    render(){
        
        let _sumReq= 0, _sumSignin= 0; 
        return(
            <div id="host_p2_attend_rate" className="main-container">
                <div className="row">
                    <div className="col-md-12">
                    <h3>各壇出席率總表 {this.props.tolSignin}</h3>
                    </div>
                </div>
                <div className="table-list">
                    <div className="row table-border">
                        <div className="col-sm-12 col-md-12 col-lg-12"><h6 className="form-title">舊金山區</h6></div>
                    </div>
                    <div className="row table-border">
                        <div className="col-sm-3 col-md-3 col-lg-3"></div>
                        <div className="col-sm-3 col-md-3 col-lg-3">應到</div>
                        <div className="col-sm-3 col-md-3 col-lg-3">實到</div>
                        <div className="col-sm-3 col-md-3 col-lg-3">出席率</div>
                    </div>

                    {this.props.templeList.map(item => (
                        <div className="row table-border" key={item.templeId}>
                            <div className="col-sm-3 col-md-3 col-lg-3">{item.templeName}</div>
                            <div className="col-sm-3 col-md-3 col-lg-3 req">{item.tolReq}</div>
                            <div className="col-sm-3 col-md-3 col-lg-3 sign bold">{item.tolSignin}</div>
                            <div className="col-sm-3 col-md-3 col-lg-3 rate bold">{(item.tolSignin/item.tolReq).toFixed(2)*100}%</div>
                            <div className="hide">{_sumReq += item.tolReq}</div>
                            <div className="hide">{_sumSignin += item.tolSignin}</div>
                        </div>
                    ))}
                    
                    
                    <div id="tolRate" className="row table-border">
                        <div className="col-sm-3 col-md-3 col-lg-3">小計</div>
                        <div className="col-sm-3 col-md-3 col-lg-3 req">{_sumReq}</div>
                        <div className="col-sm-3 col-md-3 col-lg-3 sign bold">{_sumSignin}</div>
                    <div className="col-sm-3 col-md-3 col-lg-3 rate bold">{(_sumSignin/_sumReq).toFixed(2)*100}%</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllAttendantRate;