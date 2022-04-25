import React, {Component} from 'react';

class ClassAttendList extends Component{

    
    render(){
        let classKey="", templeClassSummaryObj = this.props.templeClassSummaryObj;

        return(
            <div id="grad_class_list" className={'main-container ' + (this.props.event === 'class' ? '': 'hide')}>
            <div className="row">
                <div className="col-md-12">
                    <h1>進修班畢班名冊</h1>
                    <p>{this.props.eventYear} 發一崇德進修班畢班</p>
                </div>
            </div>
            <div className="table-content">
                {
                    this.props.classSummaryArr.map((data, key)=>(
                        
                        <div className="table-divider" key={key}>
                            <div className="row table-list-l table-border">
                                <div className="col-lg-12">
                                    <h4>{data[0]}</h4>
                                    {this.props.templeClassSummaryObj.map((temple, templeKey)=>(
                                        <div className={(temple[2][key][0]==='' ? 'hide' : '') } key={templeKey}>
                                            <span className="bold">{temple[1]}</span> (應到: <span className="num-line">{temple[2][key][1]}</span>位、實到: <span className="num-line">{temple[2][key][2]}</span>位)<br />
                                        </div>
                                    ))}
                                    <div className="line-spacing-s">
                                        <span className="bold">應到： <span className="num-line">{data[2] + data[3]}</span>位 (乾: <span className="num-line">{data[2]}</span>位、坤: <span className="num-line">{data[3]}</span>位)</span>
                                    </div>
                                    <div>
                                        <span className="bold">實到： <span className="num-line">{data[4] + data[5]}</span>位 (乾: <span className="num-line">{data[4]}</span>位、坤: <span className="num-line">{data[5]}</span>位)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row table-list-s table-border">
                                <div className="col-sm-1 col-md-1 col-lg-1">編號</div>
                                <div className="col-sm-3 col-md-3 col-lg-3">姓名</div>
                                <div className="col-sm-1 col-md-1 col-lg-1">姓別</div>
                                <div className="col-sm-1 col-md-1 col-lg-1">出席</div>
                                <div className="col-sm-3 col-md-3 col-lg-3">所屬佛堂</div>
                                <div className="col-sm-3 col-md-3 col-lg-3">須立愿力</div>
                            </div>
                            {this.props.classMemberObj[data[1]]
                            .sort((a, b) => a[3] > b[3] ? -1 : 1) //sort by temple
                            .sort((a, b) => a[6] > b[6] ? -1 : 1) //sort by attendance
                            .map((member, memberKey)=>(
                                <div className="row table-list-s table-border" key={memberKey}>
                                    <div className="col-sm-1 col-md-1 col-lg-1">{memberKey+1}</div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">{member[1]}</div>
                                    <div className="col-sm-1 col-md-1 col-lg-1">{member[2]}</div>
                                    <div className="col-sm-1 col-md-1 col-lg-1">{member[6]}</div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">{member[3]}</div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">{member[7]}</div>
                                </div>
                            ))}
                            
                        </div>
                    ))
                }
                <div className="pagebreak"></div>
            </div>
            </div>
        );
    }
}

export default ClassAttendList;