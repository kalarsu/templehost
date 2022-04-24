import React, {Component} from 'react';

class HostAttendantSummary extends Component{
    render(){
        return(
            <div className="block-container table-list-m page-break">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12"><h3>活動人數統計：</h3></div>
                </div>
                <div className="row table-border">
                    <div className="col-sm-12 col-md-12 col-lg-12">共：<span id="tol_signin" className="num-line">{this.props.tolSignin}</span>位 
    (大人 <span className="num-line" id="tol_adult">{this.props.tolAdult}</span>位、小孩 <span className="num-line" id="tol_kids">{this.props.tolChildren}</span>位)</div>
                </div>
                <div className="row table-border">
        <div className="col-sm-6 col-md-6 col-lg-6">乾： <span id="tol_male" className="num-line">{this.props.tolMale}</span>位</div>
                    <div className="col-sm-6 col-md-6 col-lg-6">坤： <span id="tol_female" className="num-line">{this.props.tolFemale}</span>位</div>
                    <div className="col-sm-6 col-md-6 col-lg-6">童： <span id="tol_boy" className="num-line">{this.props.tolBoy}</span>位</div>
                    <div className="col-sm-6 col-md-6 col-lg-6">女： <span id="tol_girl" className="num-line">{this.props.tolGirl}</span>位</div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">非班員： <span id="tol_signin_others" className="num-line">{this.props.tolSigninOthers}</span>位</div>
                </div>
            </div>
        );
    }
}

export default HostAttendantSummary;