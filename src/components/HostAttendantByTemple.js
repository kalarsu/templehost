import React, {Component} from 'react';

class HostAttendantByTemple extends Component{
    render(){

        return(
            <div id="host_p3_by_temple" className="main-container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>舊金山區</h1>
                    </div>
                </div>
                <div className="table-content">
                    <div className="table-divider">

                    {this.props.templeList.map(data => (
                        <div className="temple-wrap" key={data.templeId}>
                            <div className="" zande="">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <h3>{data.templeName}</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">應到：<span className="num-line req">{data.tolReq}</span>位、<span className="bold">實到：</span><span className="num-line signin">{data.tolSignin}</span>位</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">壇主講師：<span className="num-line host_signin">{data.tolHost}</span>位、副壇主：<span className="num-line ahost_signin">{data.tolAHost}</span>位、德字班：<span className="num-line declass_signin">{data.tolDeclass}</span>位</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">其他道親：<span className="num-line others_signin">{data.tolOthers}</span>位</div>
                                </div>
                                <hr/>
                                <div className="row table-list-s table-border">
                                    <div className="col-sm-2 col-md-2 col-lg-2">編號</div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">壇主名冊</div>
                                    <div className="col-sm-2 col-md-2 col-lg-2">性別</div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">天職</div>
                                    <div className="col-sm-2 col-md-2 col-lg-2">實到出席</div>
                                </div>
                            </div>
                            {
                                data.templeArr
                                .sort((a, b) => a[3] > b[3] ? 1 : -1)
                                .map((subItem, key) => (
                                    <div className="row table-list-s table-border" key={subItem[0]}>
                                        <div className="col-sm-2 col-md-2 col-lg-2">{key+1}</div>
                                        <div className="col-sm-3 col-md-3 col-lg-3">{subItem[1]}</div>
                                        <div className="col-sm-2 col-md-2 col-lg-2">{subItem[2]}</div>
                                        <div className="col-sm-3 col-md-3 col-lg-3">{subItem[3].substring(1)}</div>
                                        <div className="col-sm-2 col-md-2 col-lg-2">{subItem[4]}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ))}

                    </div>
                    <div className="pagebreak"></div>
                </div>
            </div>
        );
    }
}

export default HostAttendantByTemple;