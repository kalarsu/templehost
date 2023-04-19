import React, {Component} from 'react';
import '../css/styles.css';
import HostHeader from './HostHeader';
import HostSummary from './HostSummary';
import HostAttendantSummary from './HostAttendantSummary';
import HostAttendRate from './HostAttendRate';
import HostAttendantByTemple from './HostAttendantByTemple';
import AllAttendantRate from './AllAttendantRate';
import {findIndex, without} from 'lodash';
import ClassAttendRate from './ClassAttendRate';
import ClassAttendList from './ClassAttendList';
// import allTempleList from './data/templeList-new.json'; 

class App extends Component{
  constructor(){
    super();
    this.state = {
      event: "", dataYear: "", eventName: "", eventDate: "", classMemberText: "",
      tolRquired : 0, tolSignin : 0, tolSigninHost : 0, tolSigninAHost : 0,
      tolSigninDeClass : 0, tolSigninOthers : 0, tolSigninClassMember : 0,
      age : 0, gender : "", tolMale : 0, tolFemale : 0 , tolBoy : 0, tolGirl : 0,
      requiredArr: [], signinArr: [],
      zanDe: [], henDe: [], tonDe: [], zenDe: [], zuDe: [], minDe: [], sanDe: [], otherTemple: [], 
      requiredObj: {}, signinObj: {}, vowToBeObj: {},
      templeList: [], lassMember: "", 
      zanDeReq: 0, henDeReq: 0, tonDeReq: 0, zenDeReq: 0, zuDeReq: 0, minDeReq: 0,
      sanDeReq: 0, hanDeReq: 0, zanWaReq: 0, othersReq: 0,
      zanDeSignin: 0, henDeSignin: 0, tonDeSignin: 0, zenDeSignin: 0, zuDeSignin: 0,
      minDeSignin: 0, sanDeSignin: 0, hanDeSignin: 0, zanWaSignin: 0, othersSignin: 0,
      vow: ["辦事人員", "", "", "", ""],
      templeClassSummaryObj:[
        ["zanDe", "沾德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]], //["新民",tolReq,rolSignin] etc
				["henDe", "恆德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
				["tonDe", "同德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
				["zenDe", "正德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
				["zuDe",  "儒德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
				["minDe", "明德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
				["sanDe", "聖德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
        ["fuDe",  "富德",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
				["others","其它",[["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0], ["",0,0]]],
      ],
      classMemberObj: {
				"xingMing": [],
				"zhiShan": [],
				"peiDe": [],
				"xingDe": [],
				"chongDe": [],
        "lecturer": [],
      },
      classVowObj: {
				"xingMing": "辦事人員",
				"zhiShan": "講員",
				"peiDe": "",
				"xingDe": "",
				"chongDe": "",
        "lecturer" : "講師",
      },
      classSummaryArr:[
				["新民","xingMing",0,0,0,0],
				["至善","zhiShan",0,0,0,0],
				["培德","peiDe",0,0,0,0],
				["行德","xingDe",0,0,0,0],
				["崇德","chongDe",0,0,0,0],
        ["講培","lecturer",0,0,0,0], //tolReq乾，tolReq坤, tolSignin乾，tolSign坤	
      ] // classListObj: {"新民班": 0, "至善班": 1, "培德班": 2, "行德班": 3, "崇德班": 4}
    }
    
    this.getTempleList = this.getTempleList.bind(this);
    this.getUrlParam = this.getUrlParam.bind(this);
    this.getJsonData = this.getJsonData.bind(this);
    this.getDataSource = this.getDataSource.bind(this);
    this.checkVows = this.checkVows.bind(this);
    this.checkVowsTobe = this.checkVowsTobe.bind(this);
    this.getVowsName = this.getVowsName.bind(this);
    this.checkIfSignin = this.checkIfSignin.bind(this);
    this.checkIfRequired = this.checkIfRequired.bind(this);
    this.checkIfClassMember = this.checkIfClassMember.bind(this);
    this.checkTempleId = this.checkTempleId.bind(this);
    this.jsonToObj = this.jsonToObj.bind(this);
    this.checkGradClass = this.checkGradClass.bind(this);
    this.genAttendanceSummary = this.genAttendanceSummary.bind(this);
    this.genReqListByTemple = this.genReqListByTemple.bind(this);

    //class member
    //this.updateClassSummaryByTemple = this.updateClassSummaryByTemple.bind(this);
  }

  genReqListByTemple(){
    let signin, required, id, name, gender, temple, vow, gradClass, notClassMemberCount=0;
    const _requiredArr = this.state.requiredArr;
    const _signinArr = this.state.signinArr;
    let _templeList = this.state.templeList;
    let _templeId;
    let classMember = this.state.classMember;
    //console.log("classMember=" + classMember);

    _signinArr.forEach((element, index)=>{ //check signIn hosts, but not in required list
      id = element[0];
			name = element[1];
			gender = element[2];
			temple = element[3];
      vow = element[4];
      gradClass = element[5];

      required = this.checkIfRequired(id);
      if (temple !== undefined){
        _templeId = this.checkTempleId(temple.substring(0,2));
      }else{
        _templeId = 9; //其它單位
      }

      //sum up all attendent by temple
      _templeList[_templeId]["tolAllSignin"] ++;

      if(this.checkIfClassMember(vow, gradClass) && required ==="no") {
        notClassMemberCount ++;
        //console.log("classMember=" + classMember);
        //if(classMember !== "class-member"){
          console.log("====Signin hosts, but not in required list:" + index + ",name="+name + ", vow=" + vow + ", temple=" + temple + ", gradClass="+gradClass);
        //}
      }
      
      if(!this.checkIfClassMember(vow, gradClass)){
        notClassMemberCount++;
        //if(classMember !== "class-member"){
          console.log("====Signin hosts, but not class member:" + index + ",name="+name + ", vow=" + vow + ", temple=" + temple + ", gradClass="+gradClass);
        //}
        _templeList[_templeId]["tolOthers"] ++;
      }
      
      if(classMember === "class-member"){
        if(vow==="1master" || vow==="2lecturer" || vow==="3host") {
          _templeList[_templeId]["tolHost"] ++;
          this.setState({ tolSigninHost: this.state.tolSigninHost+1});
        }
        if(vow==="4ahost"){
          _templeList[_templeId]["tolAHost"] ++;
          this.setState({ tolSigninAHost: this.state.tolSigninAHost+1});
        }
        if(vow==="5declass"){
          _templeList[_templeId]["tolDeclass"] ++;
          this.setState({ tolSigninDeClass: this.state.tolSigninDeClass+1});
        }
      }
    });

    this.setState({ tolSigninOthers: notClassMemberCount});

    _requiredArr.forEach( (element, index) => {
      id = element[0];
			name = element[1];
			gender = element[2];
			temple = element[3];
      vow = element[4];
      signin = this.checkIfSignin(id);
      gradClass = element[5];
      //console.log("id"+ index + ",name="+name + ", vow=" + vow + ", temple=" + temple + ", signIn=" + signin);
      
      if (temple !== undefined){
        _templeId = this.checkTempleId(temple.substring(0,2));
      }else{
        _templeId = 9; //其它單位
      }
        
      //console.log("templeInof=" + _templeList[_templeId]["templeName"]);
      //sum up temple host, Ahost, and deClass members in this temple
      if (this.checkIfClassMember(vow, gradClass)) {
        _templeList[_templeId]["tolReq"] ++ ;
        if(signin === "yes"){
          _templeList[_templeId]["tolSignin"] ++;

          if(classMember !== "class-member"){ 
            //console.log("---id"+ index + ",name="+name + ", vow=" + vow + ", temple=" + temple + ", signIn=" + signin + ", gradClass="+ gradClass);
            if(vow==="1master" || vow==="2lecturer" || vow==="3host") {
              _templeList[_templeId]["tolHost"] ++;
              this.setState({ tolSigninHost: this.state.tolSigninHost+1});
              this.setState({ tolSigninClassMember: this.state.tolSigninClassMember +1 });
            }
            if(vow==="4ahost"){
              _templeList[_templeId]["tolAHost"] ++;
              this.setState({ tolSigninAHost: this.state.tolSigninAHost+1});
              this.setState({ tolSigninClassMember: this.state.tolSigninClassMember +1 });
            }
            if(vow==="5declass"){
              _templeList[_templeId]["tolDeclass"] ++;
              this.setState({ tolSigninDeClass: this.state.tolSigninDeClass+1});
              if(classMember ==="hosts-declass") this.setState({ tolSigninClassMember: this.state.tolSigninClassMember +1 });
            }
          }else if(gradClass!==undefined && gradClass!==""){ //畢班,人才提拔
            this.setState({ tolSigninClassMember: this.state.tolSigninClassMember +1 });
          }
        } 
      }else{ //not class member
        //if(vow==="6others")   _templeList[_templeId]["tolOthers"] ++;
        //console.log("Within requried list, but not class member=" + name + ", vow=" + vow + ", temple=" + temple);
      }

      _templeList[_templeId]["templeArr"].push([id, name, gender, this.getVowsName(vow), signin]);

      this.setState({
        templeList: _templeList
      });
    });//end of forEach for _requiredAr
    
  }

  genAttendanceSummary(gender, name){
    switch(gender){
      case "乾":
        this.setState({tolMale: this.state.tolMale +1});
        break;
      case "坤":
        this.setState({tolFemale: this.state.tolFemale +1});
        break;
      case "童":
        this.setState({tolBoy: this.state.tolBoy +1});
        break;
      case "女":
        this.setState({tolGirl: this.state.tolGirl +1});
        break;
      default:
        console.log("! Gener not clear: " + gender + ", name=" + name);
        break;
    }
    this.setState({tolSignin: this.state.tolSignin +1});
  }

  getDataSource(){
    const event = this.getUrlParam("event");
    const dataYear = this.getUrlParam("dataYear");
    const eventId = this.getUrlParam("eventId");
    let systemUrl = window.location.origin, signUrl, reqUrl,    
        today = new Date(),
        todayDate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
    
    if(systemUrl.indexOf("localhost") === -1){
      signUrl = systemUrl+ "/api/v1/attendees/events/"+ eventId +"?action=SIGNIN"; 
      reqUrl  = systemUrl + "/api/v1/attendees/events/"+ eventId +"?action=REQUIRED";
    }else{
      signUrl = "./json/signin-" + eventId + ".json";
      reqUrl = "./json/required-" + eventId + ".json";
    }

    console.log("signurl="+signUrl);
    this.setState({event: event});
    this.setState({dataYear: dataYear});
    
		if( event === "temple" ){ 
			this.setState({
        eventName: "固本圖強班",
        eventDate: todayDate,
        classMemberText: "壇主、講師、副壇主",
        classMember: "hosts"
      });
		}else if(event === "host"){
			this.setState({
        eventName: "壇主講師班",
        eventDate: todayDate,
        classMemberText: "壇主、講師、副壇主、德字班道親",
        classMember: "hosts-declass"
      });
		}else{
      this.setState({
        eventName: "畢班、人才提拔",
        eventDate: todayDate,
        classMemberText: dataYear + " 年進修班畢班班員",
        classMember: "class-member"
      });
    }
    //console.log("eventName="+ event);

    this.getJsonData(signUrl, (signindata) => {
      this.getJsonData(reqUrl, (reqdata)=> {

        this.jsonToObj("signin",signindata, (_dataObj)=>{
          //must have signinObj created first, then later on can check if required class member sign in or not
          this.setState({
            signinObj: _dataObj
          });
          this.jsonToObj("required",reqdata, (_dataObj)=>{
            this.setState({
              requiredObj: _dataObj
            });
          });
        });
        this.genReqListByTemple();

      });
    });
  }

  jsonToObj(type, data, callback){
    console.log("jsonToObj Type=" + type);

    let classMember= "", dataObj={}, dataArr=[], 
        id, name, gender, temple, templeId, vow, gradClass, vowTobe, 
        xingMing=[], zhiShan=[],peiDe=[], xingDe=[], chongDe=[],lecturer=[],
        xingMingSum = this.state.classSummaryArr[0], //[0,0,0,0] tolReqMale = 0, tolReqFemale = 0, tolSigninMale = 0, tolSigninFemale = 0,
        zhiShanSum = this.state.classSummaryArr[1],
        peiDeSum = this.state.classSummaryArr[2],
        xingDeSum = this.state.classSummaryArr[3],
        chongDeSum = this.state.classSummaryArr[4],
        lecturerSum = this.state.classSummaryArr[5],
        classMemberObj={},classSummaryArr=[], 
        templeClassSummaryObj=this.state.templeClassSummaryObj;    
        classMember = this.state.classMember;

    const result = data.map( item => {
      id = item.id;
			name = item.name;
			gender = item.gender;
      temple = item.currentTemple;
      vow = this.checkVows(id, type, name, item.vows, item.taoClasses);
      gradClass = this.checkGradClass(name, item.taoClasses);
      // console.log("name=" + name);
      // console.log("gradClass=" + gradClass);
      vowTobe = this.checkVowsTobe(gradClass,item.vows);
      //console.log("vowTobe=" + vowTobe);
      if(temple==undefined) {
        temple = "其它";
        console.log("! Name=" + name + "--has no temple assigned, assigned to 其它 for now.");
      }

      temple = temple.substring(0,2);
      templeId = this.checkTempleId(temple);
      if (temple==="崇慧") temple = "沾德";
      //console.log("templeId=" + templeId);
      dataObj[id] = [name, gender, temple, vow, gradClass];
      dataArr.push([id, name, gender, temple, vow, gradClass]);

      if(type ==="required") { //班員出席統計 summary section only
        //console.log(id + "-Checked?" + this.checkIfSignin(id));
        if(classMember==="hosts" && vow !== "6others" && vow !== "5declass"){ //Friday
          this.setState({tolRquired: this.state.tolRquired +1});
        }else if(classMember ==="hosts-declass" && vow !== "6others"){ //Saturday hosts + declass
          this.setState({tolRquired: this.state.tolRquired +1});
        }else if(classMember==="class-member" && gradClass!==undefined && gradClass!==""){// Sunday , only graducated class memeber
          this.setState({tolRquired: this.state.tolRquired +1});
          
          //form class memeber obj, and summary
          //console.log("gradClass=" + gradClass);
          switch(gradClass){
            case "1xingMing":
              xingMing.push([id, name, gender, temple, vow, gradClass, this.checkIfSignin(id), vowTobe]);
              (gender==="乾") ? xingMingSum[2]++ : xingMingSum[3]++;
              
              templeClassSummaryObj[templeId][2][0][0]= "新民";
              templeClassSummaryObj[templeId][2][0][1]++;
              break;
            case "2zhiShan":
              zhiShan.push([id, name, gender, temple, vow, gradClass, this.checkIfSignin(id), vowTobe]);
              (gender==="乾") ? zhiShanSum[2]++ : zhiShanSum[3]++;
              templeClassSummaryObj[templeId][2][1][0]= "至善";
              templeClassSummaryObj[templeId][2][1][1]++;
              break;
            case "3peiDe":
              peiDe.push([id, name, gender, temple, vow, gradClass, this.checkIfSignin(id), vowTobe]);
              (gender==="乾") ? peiDeSum[2]++ : peiDeSum[3]++;
              templeClassSummaryObj[templeId][2][2][0]= "培德";
              templeClassSummaryObj[templeId][2][2][1]++;
              break;
            case "4xingDe":
              xingDe.push([id, name, gender, temple, vow, gradClass, this.checkIfSignin(id), vowTobe]);
              (gender==="乾") ? xingDeSum[2]++ : xingDeSum[3]++;
              templeClassSummaryObj[templeId][2][3][0]= "行德";
              templeClassSummaryObj[templeId][2][3][1]++;
              break;
            case "5chongDe":
              chongDe.push([id, name, gender, temple, vow, gradClass, this.checkIfSignin(id), vowTobe]);
              (gender==="乾") ? chongDeSum[2]++ : chongDeSum[3]++;
              templeClassSummaryObj[templeId][2][4][0]= "崇德";
              templeClassSummaryObj[templeId][2][4][1]++;
              //console.log("required 崇德="+name);
              break;
            case "6lecturer":
                lecturer.push([id, name, gender, temple, vow, gradClass, this.checkIfSignin(id), vowTobe]);
                (gender==="乾") ? lecturerSum[2]++ : lecturerSum[3]++;
                templeClassSummaryObj[templeId][2][5][0]= "講培";
                templeClassSummaryObj[templeId][2][5][1]++;
                break;  
          }
        }
      }else{ //type === "signin"
        this.genAttendanceSummary(gender, name); // upate 活動人數統計 summary

        if(classMember==="class-member" && gradClass!==undefined && gradClass!==""){// Sunday , only graducated class memeber
          
          switch(gradClass){
            case "1xingMing":
              (gender==="乾") ? xingMingSum[4]++ : xingMingSum[5]++;
              templeClassSummaryObj[templeId][2][0][0]= "新民";
              templeClassSummaryObj[templeId][2][0][2]++;
              break;
            case "2zhiShan":
              (gender==="乾") ? zhiShanSum[4]++ : zhiShanSum[5]++;
              templeClassSummaryObj[templeId][2][1][0]= "至善";
              templeClassSummaryObj[templeId][2][1][2]++;
              break;
            case "3peiDe":
              (gender==="乾") ? peiDeSum[4]++ : peiDeSum[5]++;
              templeClassSummaryObj[templeId][2][2][0]= "培德";
              templeClassSummaryObj[templeId][2][2][2]++;
              break;
            case "4xingDe":
              (gender==="乾") ? xingDeSum[4]++ : xingDeSum[5]++;
              templeClassSummaryObj[templeId][2][3][0]= "行德";
              templeClassSummaryObj[templeId][2][3][2]++;
              break;
            case "5chongDe":
              (gender==="乾") ? chongDeSum[4]++ : chongDeSum[5]++;
              templeClassSummaryObj[templeId][2][4][0]= "崇德";
              templeClassSummaryObj[templeId][2][4][2]++;
              //console.log("signin 崇德="+name);
              break;
            case "6lecturer":
                (gender==="乾") ? lecturerSum[4]++ : lecturerSum[5]++;
                templeClassSummaryObj[templeId][2][5][0]= "講培";
                templeClassSummaryObj[templeId][2][5][2]++;
                break;
          }
        }
      }
    }); // end of map
    
    if(type==="required"){
      this.setState({requiredArr: dataArr});
    }else{
      this.setState({signinArr: dataArr});
    }

    if (classMember==="class-member"){
      if(type==="required"){
        classMemberObj.xingMing = xingMing;
        classMemberObj.zhiShan = zhiShan;
        classMemberObj.peiDe = peiDe;
        classMemberObj.xingDe = xingDe;
        classMemberObj.chongDe = chongDe;
        classMemberObj.lecturer = lecturer;
        this.setState({classMemberObj: classMemberObj});
        this.setState({templeClassSummaryObj: templeClassSummaryObj});
        //console.log("classMemberObj=" + JSON.stringify(classMemberObj));
        // console.log("templeClassSummaryObj=" + JSON.stringify(templeClassSummaryObj));
      }
      
      classSummaryArr[0] = xingMingSum;
      classSummaryArr[1] = zhiShanSum;
      classSummaryArr[2] = peiDeSum;
      classSummaryArr[3] = xingDeSum;
      classSummaryArr[4] = chongDeSum;
      classSummaryArr[5] = lecturerSum;
      this.setState({classSummaryArr: classSummaryArr});
      this.setState({templeClassSummaryObj: templeClassSummaryObj});
      // console.log("classSummaryArr=" + JSON.stringify(classSummaryArr));
      // console.log("templeClassSummaryObj=" + JSON.stringify(templeClassSummaryObj));
    }

    //console.log("type:" + type, ", inde:"+ ++index + ", currObj="+dataObj[5]);
    callback(dataObj);
  }

  checkIfSignin(id){
    //console.log("id="+id);
    const _signinObj = this.state.signinObj;
    return (_signinObj[id] && _signinObj[id] !== undefined) ? "yes" : "x";
  }

  checkIfRequired(id){
    const _requiredObj = this.state.requiredObj;
    return (_requiredObj[id] && _requiredObj[id] !== undefined) ? "yes" : "no";
  }

  checkIfClassMember(vow, gradeClass){
    let classMember = this.state.classMember;
    if ((classMember ==="hosts" && vow !== "5declass" && vow !== "6others") || 
        (classMember ==="hosts-declass" && vow !== "6others") ||
        (classMember ==="class-member" && gradeClass !== "" && gradeClass!== undefined) 
       )
    {
      return true;
    }else{
      return false;
    }
  }

  checkVows(id, type, name, vows, taoClasses){
    if(vows){
			if(vows["transmittingMaster"]){
				if(vows["transmittingMaster"].made === true){
          //if(type==="signin") this.setState({ tolSigninHost: this.state.tolSigninHost+1});
          return "1master";
        };
			}
			if(vows["lecturer"]){
				if(vows["lecturer"].made === true){
          //if(type==="signin") this.setState({ tolSigninHost: this.state.tolSigninHost+1});
          return "2lecturer";
        };
			}
      if(vows["templeHost"]) {
        if(vows["templeHost"].made === true){
          //if(type==="signin") this.setState({ tolSigninHost: this.state.tolSigninHost+1});
          return "3host";
        };
      }	
      if(vows["assistantTempleHost"]) {
        if(vows["assistantTempleHost"].made === true){
          //if(type==="signin") this.setState({ tolSigninAHost: this.state.tolSigninAHost +1});
          return "4ahost";
        };
      }
    }

    if(taoClasses){
      if( (taoClasses.chongDe && taoClasses.chongDe.completed === true) ||
          (taoClasses.xingDe && taoClasses.xingDe.completed === true) ||
          (taoClasses.peiDe && taoClasses.peiDe.completed === true) ) {
        //if(type==="signin") this.setState({ tolSigninDeClass: this.state.tolSigninDeClass +1});
        return "5declass";
      }else{ //others 
        //if(type==="signin") this.setState({ tolSigninOthers: this.state.tolSigninOthers +1});
        return "6others";
      }
    }
		console.log("no vow nor declass" + name + ": " + vows , taoClasses);
		return false;
  }

  checkVowsTobe(gradClass, vows){
    if(gradClass == "1xingMing"){
      if(vows!=undefined){
        if(vows["taoHelper"] && vows["taoHelper"].made){
            return "辦事人員-已立";
        }else{
          return "辦事人員";
        }
      }else{
        return "辦事人員";
      }
    }else if(gradClass == "2zhiShan"){
      if(vows !== undefined){
        if(vows["assistantLecturer"] && vows["assistantLecturer"].made){
          return "講員-已立";
        }else{
          return "講員";
        }
      }else{
        return "講員";
      }
    }else if(gradClass == "6lecturer"){
      if(vows !== undefined){
        if(vows["lecturer"] && vows["lecturer"].made){
          return "講師-已立";
        }else{
          return "講師";
        }
      }else{
        return "講師";
      }
    }else{
      return "---";
    }
  }

  getVowsName(vow){
    switch(vow){
      case "1master":
        return "1點傳師";
      case "2lecturer":
        return "2壇主、講師";
      case "3host":
        return "3壇主";
      case "4ahost":
        return "4副壇主";
      case "5declass":
        return "5德字班";
      default:
        return "6其他";
    }
  }

  checkGradClass(name, taoClasses){
    const dataYear = this.state.dataYear;
    let gradClass = "";

    if(taoClasses){
      if(taoClasses.lecturer && taoClasses.lecturer.completed === true && taoClasses.lecturer.completionDate && taoClasses.lecturer.completionDate.substr(0, 10).includes(dataYear)) {
        gradClass = "6lecturer" ;
      }else if(taoClasses.chongDe && taoClasses.chongDe.completed === true && taoClasses.chongDe.completionDate && taoClasses.chongDe.completionDate.substr(0, 10).includes(dataYear)) {
        gradClass = "5chongDe" ;
      }else if(taoClasses.xingDe && taoClasses.xingDe.completed === true && taoClasses.xingDe.completionDate && taoClasses.xingDe.completionDate.substr(0, 10).includes(dataYear)){
        gradClass = "4xingDe";
      }else if(taoClasses.peiDe && taoClasses.peiDe.completed === true && taoClasses.peiDe.completionDate && taoClasses.peiDe.completionDate.substr(0, 10).includes(dataYear)){
        gradClass = "3peiDe";
      }else if(taoClasses.zhiShan && taoClasses.zhiShan.completed === true && taoClasses.zhiShan.completionDate && taoClasses.zhiShan.completionDate.substr(0, 10).includes(dataYear)){
        gradClass = "2zhiShan";
      }else if(taoClasses.xingMing && taoClasses.xingMing.completed === true && taoClasses.xingMing.completionDate && taoClasses.xingMing.completionDate.substr(0, 10).includes(dataYear)){
        gradClass = "1xingMing";
      }else{ //others 
        gradClass = "";
      }
    }else{
      console.log("no grad lass" + name + ": " , taoClasses);
      gradClass = "";
    }
    return gradClass;
  }

  checkTempleId(name){
    switch(name){
      case "沾德":
        return 0;
        break;
      case "恆德":
        return 1;
        break;
      case "同德":
        return 2;
        break;
      case "正德":
        return 3;
        break;
      case "儒德":
        return 4;
        break;
      case "明德":
        return 5; 
        break;
      case "聖德":
        return 6;
        break;
      case "富德":
        return 7;
        break;  
      case "其它":
        return 8; 
        break;
      default:
        return 8; 
        break;          
    }
  }

  getUrlParam(parameter){
    let getAction="", url = "";
    url = new URLSearchParams(window.location.search);
    getAction = url.get(parameter);
    if(getAction===null){
      alert("You forgot to enter event type in the URL parameter! This page wont be generating correct data! Enter ex: ?event=temple, host, class");
    }else{
      return getAction;
    }
  }

  getJsonData(_url, callback){
    console.log("Json _url=" + _url);
    
    fetch(_url)
    .then(response => response.json())
    .then(result => {
       callback(result);
    });
  }

  getTempleList(){
    let systemUrl = window.location.origin, url;
    if(systemUrl.indexOf("localhost") === -1){
      url = `${systemUrl}/static/json/templeList.json`;
    }else{
      url = "./json/templeList.json";
    }
    console.log("getTempleList=" + url);

    fetch(url)
    .then(response => response.json())
    .then(result => {
      const tempList = result.map(item => {
        return item;
      });
      this.setState({templeList: tempList});
    });
  }

  // getTempleList(){
  //   const tempList = allTempleList.map(item => {
  //     return item;
  //   });
  //   this.setState({templeList: tempList});
  // }

  componentDidMount(){
    this.getDataSource();
    this.getTempleList();
  }

  render(){
    
    return(
      <div>
        <div id="host-class" className="main-container event-name">
          <HostHeader
            eventName = {this.state.eventName}
            eventDate = {this.state.eventDate}
            classMemberText = {this.state.classMemberText}
          />
          <HostSummary
            event = {this.state.event}
            tolRquired = {this.state.tolRquired}
            tolSigninClassMember = {this.state.tolSigninClassMember}
            tolSigninHost = {this.state.tolSigninHost}
            tolSigninAHost = {this.state.tolSigninAHost}
            tolSigninDeClass = {this.state.tolSigninDeClass}
            classSummaryArr = {this.state.classSummaryArr}
          />
          <HostAttendantSummary
            eventType = {this.state.classMember}
            tolSignin = {this.state.tolSignin}
            tolAdult = {this.state.tolMale + this.state.tolFemale}
            tolChildren = {this.state.tolBoy + this.state.tolGirl}
            tolMale = {this.state.tolMale}
            tolFemale = {this.state.tolFemale}
            tolBoy = {this.state.tolBoy}
            tolGirl = {this.state.tolGirl}
            tolSigninOthers = {this.state.tolSigninOthers}
          />
        </div>
        <AllAttendantRate
          templeList = {this.state.templeList}
          tolSignin = {this.state.tolSignin}
        />
        <hr/>
        <HostAttendRate
          templeList = {this.state.templeList}
        />
        <hr/>
        <ClassAttendRate
          event = {this.state.event}
          templeClassSummaryObj = {this.state.templeClassSummaryObj}
        />
        <hr/>
        <ClassAttendList
          event = {this.state.event}
          dataYear = {this.state.dataYear}
          templeClassSummaryObj = {this.state.templeClassSummaryObj}
          classSummaryArr = {this.state.classSummaryArr}
          classMemberObj = {this.state.classMemberObj}
        />
        <hr/>
        <HostAttendantByTemple
          templeList = {this.state.templeList}
        />
      </div>
      
    );
  }
}

export default App;
