import React, {Component} from 'react';

class HostHeader extends Component{
    render(){
        return(
            <div>
                <div className="row h3 page-title">
                    <div className="col-md-12">
                    發一崇德舊金山道務中心　<span className="h1">{this.props.eventName}</span>　出席名冊
                    </div>
                </div>
                <hr />
                <div className="block-container">
                    <div className="row">
                        <div className="col-sm-4 col-md-2">地區：</div>
                        <div className="col-sm-8 col-md-10">舊金山道務中心</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-md-2">活動名稱：</div>
                        <div className="col-sm-8 col-md-10">{this.props.eventName}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-md-2">活動日期：</div>
                        <div className="col-sm-8 col-md-10">{this.props.eventDate}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-md-2">班員：</div> 
                        <div className="col-sm-8 col-md-10 class-member">{this.props.classMemberText}</div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default HostHeader;