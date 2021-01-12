import React, {Component} from 'react';

class HostSummary extends Component{
    render(){
        return(
            <div className="block-container table-list">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12"><h3>班員出席統計：</h3></div>
                </div>
                <div className={(this.props.event === 'class' ? '': 'hide')}>
                    {this.props.classSummaryArr.map((data, key) => (
                        <div className="row table-border" key={data[0]}>
                            <div className="col-sm-4 col-md-2 col-lg-2">{data[0]}</div>
                            <div className="col-sm-4 col-md-5 col-lg-5">應到： <span className="num-line">{data[2]+data[3]}</span>位</div>
                            <div className="col-sm-4 col-md-5 col-lg-5">實到： <span className="num-line">{data[4]+data[5]}</span>位</div>
                        </div>
                    ))}
                </div>
                <div className={'row table-border ' + (this.props.event === 'class' ? 'hide': '')}>
                    <div className="col-sm-6 col-md-6 col-lg-6">應到： <span id="tol_required_class_member" className="num-line">{this.props.tolRquired}</span>位</div>
                    <div className="col-sm-6 col-md-6 col-lg-6">實到： <span id="tol_signin_class_member" className="num-line">{this.props.tolSigninClassMember}</span>位</div>
                </div>

                <div className={'row table-top-margin-m ' + (this.props.event === 'class' ? '': 'hide')}>
                    <div className="col-sm-12 col-md-12 col-lg-12"><h3>壇主講師出席統計：</h3></div>
			    </div>

                <div className="row table-border">
                    <div className="col-sm-4 col-md-4 col-lg-4">壇主講師： <span id="tol_signin_host" className="num-line">{this.props.tolSigninHost}</span>位</div>
                    <div className="col-sm-4 col-md-4 col-lg-4">副壇主： <span id="tol_signin_ahost" className="num-line">{this.props.tolSigninAHost}</span>位</div>
                    <div className="col-sm-4 col-md-4 col-lg-4">德字班： <span id="tol_signin_declass" className="num-line">{this.props.tolSigninDeClass}</span>位</div>
                </div>
            </div>
        );
    }
}

export default HostSummary;