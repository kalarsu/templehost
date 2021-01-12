import React, {Component} from 'react';

class ClassAttendRate extends Component{
    render(){
        let temple;
        return(
            <div id="class_member_attend_rate" className={'main-container ' + (this.props.event === 'class' ? '': 'hide')}>
                <div className="row">
                    <div className="col-md-12">
                        <h3>各壇班員統計</h3>
                    </div>
                </div>
                <div className="table-list">
                    <div className="row table-border">
                        <div className="col-sm-3 col-md-3 col-lg-3"></div>
                        <div className="col-sm-3 col-md-3 col-lg-3 bold">班別</div>
                        <div className="col-sm-2 col-md-2 col-lg-2 bold">應到</div>
                        <div className="col-sm-2 col-md-2 col-lg-2 bold">實到</div>
                        <div className="col-sm-2 col-md-2 col-lg-2 bold">出席率</div>
                    </div>
                    <div className="table-content">
                        {
                            this.props.templeClassSummaryObj.map((data) => (
                                data[2].map((classItem, key)=>(
                                    <div className={'row table-border rate-row ' + ( classItem[0]==='' ? 'hide' : '')} key={key}>
                                        <div className="col-sm-3 col-md-3 col-lg-3 temple">{data[1]}</div>
                                        <div className="col-sm-3 col-md-3 col-lg-3 class-name">{classItem[0]}</div>
                                        <div className="col-sm-2 col-md-2 col-lg-2 req">{classItem[1]}</div>
                                        <div className="col-sm-2 col-md-2 col-lg-2 sign bold">{classItem[2]}</div>
                                        <div className="col-sm-2 col-md-2 col-lg-2 rate bold">{(classItem[2]/classItem[1]*100).toFixed(2)}%</div>
                                    </div>
                                ))
                            ))
                        }
                        
                    </div>
                </div>
            </div>

        );
    }
}

export default ClassAttendRate;