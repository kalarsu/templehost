import React, {Component} from 'react';

class AllAttendantRate extends Component{
    render(){
        
        let _sumAllSignin= 0; 
        return(
            <div id="host_p2_attend_rate" className="main-container">
                <div className="row">
                    <div className="col-md-12">
                    <h3>各壇出席率總表 {this.props.tolSignin}</h3>
                    </div>
                </div>
                <div className="table-list-m">
                    <div className="row table-border">
                        <div className="col-sm-12 col-md-12 col-lg-12"><h6 className="form-title">舊金山區</h6></div>
                    </div>
                    <div className="row table-border">
                        <div className="col-sm-3 col-md-3 col-lg-3"></div>
                        <div className="col-sm-9 col-md-9 col-lg-9">實到</div>
                    </div>

                    {this.props.templeList.map(item => (
                        <div className="row table-border" key={item.templeId}>
                            <div className="col-sm-3 col-md-3 col-lg-3">{item.templeName}</div>
                            <div className="col-sm-9 col-md-9 col-lg-9 sign bold">{item.tolAllSignin}</div>
                            <div className="hide">{_sumAllSignin += item.tolAllSignin}</div>
                        </div>
                    ))}
                    
                    <div id="tolRate" className="row table-border">
                        <div className="col-sm-3 col-md-3 col-lg-3">小計</div>
                        <div className="col-sm-9 col-md-9 col-lg-9 sign bold">{_sumAllSignin}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllAttendantRate;