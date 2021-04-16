let moment = require('moment');
let shortid = require('shortid');
let constant = require('../constants/constant');

let request = require('request');
let Cryptr = require('cryptr');
let cryptr = new Cryptr(constant.secretKeys.cryptrSecretKey);

let User = require('../models/User');
let ParkingLot = require('../models/ParkingLot');
let PatrollerLogs = require('../models/PatrollerLogs');
let Transaction = require('../models/Transaction');
let ShortUrl = require('../models/ShortUrl');

let socket_controller = require('./socket-controller');
let emailService = require('../emailService/emailService');
let environment = require('../environments/environment');

exports.updateTransactionsLocations = async ()=> {
    try {
      let currentDate = moment(new Date).format();

      currentDate = moment.utc(currentDate).format();

      // console.log(currentDate, '    current date in server');
      // let priorTime = moment().subtract(11, 'minutes').format();
    
      // let priorTime = moment().add(11, 'minutes').startOf('minute').format();
      let priorTime = moment.utc(currentDate).add(11, 'minutes').startOf('minute').format();
    
      let pastTime = moment.utc(currentDate).subtract(15, 'minutes').startOf('minute').format();
      // console.log(pastTime,'  15 minutes previous time than current time');
    
      // console.log(priorTime,'  11 minutes next time');
    
      // 1 CRON **********************************
      let transactions = await Transaction.find({ endTime: { $lt: currentDate }, isTimeExtendedForThisTransaction: false, isCompleted: false, isParkingTransaction: true }).populate('parkingLot');
      if(transactions){
        // console.log(transactions, 'transactions list');
        let updateTransactions = await Transaction.updateMany({ _id: { $in: transactions } }, { isCompleted: true });
        if(updateTransactions){
          // console.log(updateTransactions, 'Transactions updated from isCompleted=false to TRUE');
        }
        else{
          // console.log(updateTransactions, 'No transactions to update');
        }
    
        function onlyUnique(value, index, self){
          return self.indexOf(value) === index;
        }

        const parkingLotIds = transactions.map((t)=> t.parkingLot._id);
        // console.log(parkingLotIds, '   parkingLotIds');
        let uniqueParkingList = parkingLotIds.filter( onlyUnique );
        let result = [];
        let count = 0;

        for(let i=0;i<uniqueParkingList.length;i++){
          count = 0;
          let location=uniqueParkingList[i];
          for(let j=0;j<parkingLotIds.length;j++){
            if(location == parkingLotIds[j]){
              count = count+1;
            }
          }
          result.push({ location: location, count: count });
        }
        // console.log(result, '    result of locations array in transaction & locations update');

        for(let i=0;i<result.length;i++){
          let updateParkingLot = await ParkingLot.findOneAndUpdate({ _id: result[i].location }, { $inc: { spacesAvailable: result[i].count } }, { new: true });
          if(updateParkingLot){
            socket_controller.getParkingLot(updateParkingLot);
            // console.log(updateParkingLot.zone, `  location updated by space ${result[i].count} increment`);
          }
          else{
            // console.log(updateParkingLot,'  parkingLot not updated');
          }
        }


        // Old code*************************
        // for(let i=0;i<parkingLotIds.length;i++){
        //   let updateParkingLot = await ParkingLot.findOneAndUpdate({ _id: parkingLotIds[i] }, { $inc: { spacesAvailable: 1 } }, { new: true });
        //   if(updateParkingLot){
        //     socket_controller.getParkingLot(updateParkingLot);
        //     // console.log(updateParkingLot,'  parkingLot updated by space +1 increment');
        //   }
        //   else{
        //     // console.log(updateParkingLot,'  parkingLot not updated');
        //   }
        // }

        // Old code*************************
        // let updateParkingLots = await ParkingLot.updateMany({ _id: { $in: parkingLotIds } }, { $inc: { spacesAvailable: 1 } });
        // if(updateParkingLots){
        //   for(let i=0;i<parkingLotIds.length;i++){
        //     socket_controller.getParkingLot(parkingLotIds[i]);
        //   }
        //   // console.log(updateParkingLots,'  parkingLots updated by space +1 increment');
        // }
        // else{
        //   // console.log(updateParkingLots,'  no parkingLots updated');
        // }
    
      }
      else{
        console.log(transaction,'  err in finding transaction');
      }
    
    
    
      // 2 CRON **********************************
      let transactionsToExtendTime = await Transaction.find({ endTime: { $lt: priorTime }, isExtendTimeMessageSent: false, isParkingTransaction: true }).populate('user');
      // let transactionsToExtendTime = await Transaction.find({}).populate('user');
      if(transactionsToExtendTime){
        // console.log(transactionsToExtendTime, '   transactionsToExtendTime result----isExtendTimeMessageSent is false here');
        // console.log(transactionsToExtendTime.length, '   transactionsToExtendTime length');
        if(transactionsToExtendTime.length > 0){
          for(let i=0;i<transactionsToExtendTime.length;i++){
            let encryptTransactionId = cryptr.encrypt(transactionsToExtendTime[i]._id);
            // console.log(encryptTransactionId,'    ---i encrypted transaction Id', i);
      
            let encryptParkingLotId = cryptr.encrypt(transactionsToExtendTime[i].parkingLot);
            // console.log(encryptParkingLotId,'    ---i encrypted parkingLot Id', i);
      
            // console.log(transactionsToExtendTime[i]._id,'  ---  ',i);
      
            let firstName = transactionsToExtendTime[i].user.firstName;
            let email = transactionsToExtendTime[i].userEmail;
            let zone = transactionsToExtendTime[i].zone;
            let address = transactionsToExtendTime[i].address;
            let zoneName = transactionsToExtendTime[i].parkingLotName;
            let transactionId = transactionsToExtendTime[i].transactionId;
            // let endTime = moment(transactionsToExtendTime[i].endTime).format('MMMM Do YYYY, h:mm a');
            let endTime = transactionsToExtendTime[i].userEndTime;
            let amount = transactionsToExtendTime[i].amount;
            
            let randomId = shortid.generate();
            let actualLink = `${environment.web_url}checkout?id=${encryptParkingLotId}&extend=true&tId=${encryptTransactionId}`;
      
            let shortLink = `${environment.web_url}checkout/${randomId}/true`;
      
            const shortData = new ShortUrl({
              shortId: randomId,
              parkingLotId: transactionsToExtendTime[i].parkingLot,
              transactionId: transactionsToExtendTime[i]._id,
            });
            let newShortData = await shortData.save();
            if(!newShortData){
              console.log('Error saving Short Id in database');
            }
            else{
              console.log('Short Id saved in database: ', i);
            }
      
            // console.log(shortLink,'   link');
      
            let mobileNumber = transactionsToExtendTime[i].countryCode + transactionsToExtendTime[i].userMobileNumber;
      
            let message = `Hi ${transactionsToExtendTime[i].userFirstName}, Your current parking expires in 10 minutes. If needed, extend your time here: ${shortLink}`;
      
            environment.twilio.client.messages.create({
              body: message,
              to: mobileNumber,  // Text this number
              from: environment.twilio.from
            })
            .then((message)=>{
              console.log(message, '  response of message sent from twilio in app.js');
              transactionsToExtendTime[i].update({ $set: { isExtendTimeMessageSent: true } }, (reject, resolve)=>{
                if(resolve){
                  return;
                }
                else{
                  return;
                }
              });
            });
            
            // emailService.extendTime(email, shortLink, firstName, zone, address, zoneName, transactionId, endTime, (err,resp)=>{
            //   if(err){
            //     console.log('Email not sent in extend parking time---',i);
            //     return;
            //   }
            //   else{
            //     console.log('Email sent for extend parking time---',i);
            //     transactionsToExtendTime[i].update({ $set: { isExtendTimeMessageSent: true } }, (reject, resolve)=>{
            //       if(resolve){
            //         return;
            //       }
            //       else{
            //         return;
            //       }
            //     });
            //   }
            // });
      
          }
        }
      }
      else{
        console.log(transactionsToExtendTime, '    error in transactionsToExtendTime');
      }
    
    
    
      // 3 CRON **********************************
      let transactions2 = await Transaction.find({ endTime: { $lt: currentDate }, isTimeExtendedForThisTransaction: true, isCompleted: false, isParkingTransaction: true }).populate('parkingLot');
      if(transactions2){
        // console.log(transactions, 'transactions list');
        let updateTransactions2 = await Transaction.updateMany({ _id: { $in: transactions2 } }, { isCompleted: true });
        if(updateTransactions2){
          // console.log(updateTransactions2, 'Transactions updated from isCompleted=false to TRUE CRON-3');
        }
        else{
          // console.log(updateTransactions, 'No transactions to update');
        }
      }
      else{
        // console.log(transaction,'  err in finding transaction');
      }
    
    
      
      // 4 CRON **********************************
      let shortUrls = await ShortUrl.deleteMany({ createdAt: { $lt: pastTime } });
      if(shortUrls){
        // console.log(shortUrls, 'shortUrls list');
        // console.log(shortUrls[0].createdAt, 'shortUrls list');
      }
      else{
        // console.log(transaction,'  err in finding transaction');
      }
    } catch (err) {
      console.log(err, 'Internal server error in updating transactions and locations');
    }
}

exports.changePatrollerAssignRequests = async ()=> {
  try {

    let todayDate = moment.utc().format();
    console.log(todayDate, '    todayDate');
    let todayTime = moment(todayDate);

    // let parkingLot = await ParkingLot.find({ patrollerAssignedStatus: 'requested', isPatrollerRequested: true }).populate('manager patroller');
    let query = { $or: [{ patrollerAssignedStatus: 'requested' }, { patrollerAssignedStatus: 'pending' }] };
    let parkingLot = await ParkingLot.find(query).populate('manager patroller patrollerLogs');
    if(parkingLot){
      console.log(parkingLot.length, '     parkingLot.length in assign patroller api');

      let updatedJson = {
        patrollerAssignedStatus: 'none',
        isPatrollerRequested: false,
        isPatrollerPending: false,
        isPatrollerActive: false,
        // patroller: null
    };

    for(let i=0;i<parkingLot.length;i++){
        if(parkingLot[i].patrollerAssignedStatus == 'requested'){
          let requestedTime = moment(parkingLot[i].patrollerRequestedDate);
          // let difference = todayTime.diff(requestedTime, 'hours');
          let difference = todayTime.diff(requestedTime, 'minutes');
          console.log('Requested Zone: ', parkingLot[i].zone, '____ Status: ', parkingLot[i].patrollerAssignedStatus, '____ Requested date: ', parkingLot[i].patrollerRequestedDate, '____ Difference: ', difference);
          if(difference > 2880){
            let updateLocation = await ParkingLot.findOneAndUpdate({ _id: parkingLot[i], isDeleted: false }, { $set: updatedJson }).populate('manager patroller');
            if(updateLocation){
              let previousPatrollers = updateLocation.patrollerHistory;

              let patrollerLog = {
                  date: moment.utc().format(),
                  isNotResponded: true,
                  patroller: updateLocation.patroller,
                  patrollerEmail: updateLocation.patroller.email,
                  patrollerId: updateLocation.patroller.patrollerId,
                  companyName: updateLocation.patroller.companyName,
                  statusChangedFrom: '',
                  statusChangedTo: 'none',
                  currentstatus: 'none'
              };
              let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: updateLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
              if(findUpdatePatrollerLog){
                  console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');

                  let previousDescription = '';
                    // let description = `* Request declined by ${updateLocation.patroller.email} (${updateLocation.patroller.patrollerId}).`;
                    let description = `* Request Not Responded by Patroller: ${updateLocation.patroller.patrollerId} ${updateLocation.patroller.companyName}.`;
                    let textToPrint = '';

                    let id = findUpdatePatrollerLog.jiraIssueKeyId;
                    let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                    request( addCommentJson, (error, response, body) => {
                        console.log(error, '    error of addCommentJson');
                        console.log(response.statusCode, '    response.statusCode of addCommentJson');
                        // console.log(response, '    response of addCommentJson');
                        console.log(body, '    body of addCommentJson');
                        if(response.statusCode == 201){
                          constant.function.updatePatrollerTransition(id, '101');
                        }
                    });

                    findAndAssignNewPatroller(updateLocation);
                    updateLocation.update({ $set: { patroller: null } }, (error, resp) => {
                        if(resp){
                            // return;
                        }
                        else{
                            // return;
                        }
                    });

              }

              emailService.timeExpiryEmailToPatroller(updateLocation, updateLocation.patroller, (err, resp) => {
                if(err){
                  console.log(err);
                }
                else{
                  console.log(resp);
                }
              });

            }

          }
        }
        else{
          let pendingTime = moment(parkingLot[i].patrollerPendingDate);
          // let difference = todayTime.diff(pendingTime, 'hours');
          let difference = todayTime.diff(pendingTime, 'minutes');
          console.log('Pending Zone: ', parkingLot[i].zone, '____ Status: ', parkingLot[i].patrollerAssignedStatus, '____ Pending date: ', parkingLot[i].patrollerPendingDate, '____ Difference: ', difference);
          if(difference > 2880){
            
            let updateLocation = await ParkingLot.findOneAndUpdate({ _id: parkingLot[i], isDeleted: false }, { $set: updatedJson }).populate('manager patroller');
            if(updateLocation){
              let previousPatrollers = updateLocation.patrollerHistory;

              let patrollerLog = {
                  date: moment.utc().format(),
                  isNotResponded: true,
                  patroller: updateLocation.patroller,
                  patrollerEmail: updateLocation.patroller.email,
                  patrollerId: updateLocation.patroller.patrollerId,
                  companyName: updateLocation.patroller.companyName,
                  statusChangedFrom: '',
                  statusChangedTo: 'none',
                  currentstatus: 'none'
              };
              let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: updateLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
              if(findUpdatePatrollerLog){
                  console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');

                  let previousDescription = '';
                    // let description = `* Request declined by ${updateLocation.patroller.email} (${updateLocation.patroller.patrollerId}).`;
                    let description = `* Request Not Responded by Patroller: ${updateLocation.patroller.patrollerId} ${updateLocation.patroller.companyName}.`;
                    let textToPrint = '';

                    let id = findUpdatePatrollerLog.jiraIssueKeyId;
                    let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                    request( addCommentJson, (error, response, body) => {
                        console.log(error, '    error of addCommentJson');
                        console.log(response.statusCode, '    response.statusCode of addCommentJson');
                        // console.log(response, '    response of addCommentJson');
                        console.log(body, '    body of addCommentJson');
                        if(response.statusCode == 201){
                          constant.function.updatePatrollerTransition(id, '81');
                        }
                    });

                    findAndAssignNewPatroller(updateLocation);
                    updateLocation.update({ $set: { patroller: null } }, (error, resp) => {
                        if(resp){
                            // return;
                        }
                        else{
                            // return;
                        }
                    });

              }

              emailService.timeExpiryEmailToPatroller(updateLocation, updateLocation.patroller, (err, resp) => {
                if(err){
                  console.log(err);
                }
                else{
                  console.log(resp);
                }
              });

            }

          }
        }







        async function findAndAssignNewPatroller(parkingLot){
          let previousPatrollers = parkingLot.patrollerHistory;
          let query = previousPatrollers.length == 0 ? { location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false } : { _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false };
          // let nearPatrollers = await User.find({ _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 4400000, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false });
          let nearPatrollers = await User.find(query);
          console.log(nearPatrollers, '     near patrollers in assignPatrollerForLocation api');
          if(nearPatrollers){
              if(nearPatrollers.length == 0){
                  updateJiraTicketForLocationIfNoPatrollerFound(parkingLot);
                  console.log('Update jira ticket 5555');
              }
              else{

                  let getAvailablePatrollerListForLog = constant.function.getAvailablePatrollerListForLog(nearPatrollers);

                  let getRandomNumber = Math.floor(Math.random() * (nearPatrollers.length));
                  let findPatroller = nearPatrollers[getRandomNumber];

                  // let findLocation = await ParkingLot.findOne({ zone: location, isDeleted: false });
                  let findLocation = await ParkingLot.findOneAndUpdate({ _id: parkingLot, isDeleted: false }, { $set: { patroller: findPatroller, isPatrollerRequested: true, patrollerAssignedStatus: 'requested', patrollerRequestedDate: moment.utc().format() } }, { new: true });
                  if(findLocation){

                      findLocation.patrollerHistory.push(findPatroller);
                      findLocation.save();

                      createPatrollerLog(findPatroller);

                      let distance;
                      let x;
                      let link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${findPatroller.latitude},${findPatroller.longitude}&destinations=${findLocation.latitude},${findLocation.longitude}&key=${constant.googlePlacesApiKey}`;
                      request(link, function (error, response, body){
                          // console.log('error:', error);
                          // console.log('response -- :', response, ': -- response');
                          console.log('statusCode:', response.statusCode);
                          console.log('body:', body);
                          x = JSON.parse(body);
                          console.log('Distance: ', x.rows[0].elements[0].distance.text);
                          if(x.status == 'OK'){
                              distance = x.rows[0].elements[0].distance.text;
                              requestPatroller();
                          }
                          else{
                              distance = 0;
                              requestPatroller();
                          }
                      });

                      async function createPatrollerLog(findPatroller){
                          let patrollerLog = {
                              date: moment.utc().format(),
                              isNewPatrollerAssigned: true,
                              patroller: findPatroller,
                              patrollerEmail: findPatroller.email,
                              patrollerId: findPatroller.patrollerId,
                              companyName: findPatroller.companyName,
                              statusChangedFrom: '',
                              statusChangedTo: 'requested',
                              currentstatus: 'requested'
                          };
                          let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: parkingLot, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                          if(findUpdatePatrollerLog){
                              console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');


                              setTimeout(() => {
                                  let previousDescription = '';
                                  // let description = `* New patroller assigned is ${findPatroller.email} (${findPatroller.patrollerId}), previous one opted out location.`;
                                  let description = getAvailablePatrollerListForLog +`* Request Issued: ${findPatroller.patrollerId} ${findPatroller.companyName}.`;
                                  let textToPrint = '';
              
                                  let id = findUpdatePatrollerLog.jiraIssueKeyId;
                                  let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                                  request( addCommentJson, (error, response, body) => {
                                      console.log(error, '    error of addCommentJson');
                                      console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                      // console.log(response, '    response of addCommentJson');
                                      console.log(body, '    body of addCommentJson');
                                      if(response.statusCode == 201){
                                          constant.function.updatePatrollerTransition(id, '41');
                                      }
                                  });

                                  // let getJiraIssueUrl = {
                                  //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                                  //     auth: constant.jiraCredentials.auth,
                                  //     method: 'GET',
                                  //     body: {},
                                  //     json: true
                                  // };
                                  // request( getJiraIssueUrl, (error, response, body) => {
                                  //     console.log(error, '    error of get issue in jira api 5');
                                  //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                                  //     // console.log(response, '    response of get issue in jira api');
                                  //     console.log(body, '    body of get issue in jira api');
                                  //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                                  //     if(response.statusCode == 200){
                                  //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                                  //         textToPrint = previousDescription + description;

                                  //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                                          
                                  //         request( jiraServiceDeskoptions , (error, response, body) => {
                                  //             console.log(error, '    error of update issue in jira service desk 4');
                                  //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                                  //             // console.log(response, '    response of update issue in jira service desk');
                                  //             console.log(body, '    body of update issue in jira service desk');
                                  //         });
                                          
                                  //     }
                                  // });
                              }, 10000);





                          }
                      }

                      function requestPatroller() {
                          emailService.requestForPatroller(findPatroller.firstName, findPatroller.companyName, findPatroller.email, findLocation.zone, findLocation.address, findPatroller.address, findPatroller.patrollingDistanceToCover, distance, (err, resp) => {
                              if(err){
                                  // return res.status(constant.httpCode.success).json({
                                  //     success: false,
                                  //     code: constant.httpCode.badRequest,
                                  //     message: constant.message.errorSendingEmail,
                                  //     data: err
                                  // });
                              }
                              else{
                                  // return res.status(constant.httpCode.success).json({
                                  //     success: true,
                                  //     code: constant.httpCode.success,
                                  //     message: constant.message.userAccountCreated,
                                  //     data: newUser
                                  // });
                              }
                          });
                      }
                  }
                  else{
                      // constant.function.parkingLotNotFound(res);
                  }
              }
          }
          else{
              updateJiraTicketForLocationIfNoPatrollerFound(parkingLot);
          }
      }

      async function updateJiraTicketForLocationIfNoPatrollerFound(findLocation){
          console.log('Update jira ticket 6666');

          setTimeout(async () => {
              let patrollerLog = {
                  date: moment.utc().format(),
                  isNoPatrollerFound: true,
                  // patroller: findPatroller,
                  // patrollerEmail: findPatroller.email,
                  statusChangedFrom: '',
                  statusChangedTo: 'requested',
                  currentstatus: 'requested'
              };
              let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
              if(findUpdatePatrollerLog){
                  let previousDescription = '';
                  // let description = `* No patroller found for location, try creating new patroller and then assign OR assign one of the existing patroller manually.`;
                  let description = `* No patroller found; Admin interaction required.`;
                  let textToPrint = '';

                  let id = findUpdatePatrollerLog.jiraIssueKeyId;
                  let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                  request( addCommentJson, (error, response, body) => {
                      console.log(error, '    error of addCommentJson');
                      console.log(response.statusCode, '    response.statusCode of addCommentJson');
                      // console.log(response, '    response of addCommentJson');
                      console.log(body, '    body of addCommentJson');
                      if(response.statusCode == 201){
                          constant.function.updatePatrollerTransition(id, '31');
                      }
                  });

                  // let getJiraIssueUrl = {
                  //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                  //     auth: constant.jiraCredentials.auth,
                  //     method: 'GET',
                  //     body: {},
                  //     json: true
                  // };
                  // request( getJiraIssueUrl, (error, response, body) => {
                  //     console.log(error, '    error of get issue in jira api 6');
                  //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                  //     // console.log(response, '    response of get issue in jira api');
                  //     console.log(body, '    body of get issue in jira api');
                  //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                  //     if(response.statusCode == 200){
                  //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                  //         textToPrint = previousDescription + description;
                          
                  //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                          
                  //         request( jiraServiceDeskoptions , (error, response, body) => {
                  //             console.log(error, '    error of update issue in jira service desk 5');
                  //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                  //             // console.log(response, '    response of update issue in jira service desk');
                  //             console.log(body, '    body of update issue in jira service desk');

                  //             if(response.statusCode == 204){
                  //                 constant.function.updatePatrollerTransition(id, '61');
                  //             }

                  //         });
                          
                  //     }
                  // });

                  findLocation.update({ $set: { patrollerAssignedStatus: 'requestedAndNotFound', isPatrollerRequested: true, patrollerRequestedDate: moment.utc().format() } }, (reject, resolve) => {
                      if(resolve){
                          return;
                      }
                      else{
                          return;
                      }
                  });   
              }
          }, 10000);

      }
    }

    }
    else{
      console.log('No locations found whose patroller status is Requested Or Pending');
    }

  } catch (err) {
    console.log(err, 'Internal server error in changing patroller assign requests');
  }
}