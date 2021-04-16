let fs = require('fs');
let constant = require('../constants/constant');
let environment = require('../environments/environment');

exports.signUp = function(email, firstName, accountType, emailVerificationLink, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/signup.html`).toString();
  mailBody = mailBody.replace(/{{firstName}}/g, firstName);
  mailBody = mailBody.replace(/{{accountType}}/g, accountType);
  mailBody = mailBody.replace(/{{emailVerificationLink}}/g, emailVerificationLink);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.signup,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer create signup');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer create signup');
      return callBack(null, res);
    }
  })
}

exports.signUp_backup = function(email, link, firstName, accountType, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/signup_backup.html`).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{link}}/g, link);
  mailBody = mailBody.replace(/{{accountType}}/g, accountType);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.signup,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer create signup');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer create signup');
      return callBack(null, res);
    }
  })
}

exports.resetPassword = function(email, link, firstName, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/resetpassword.html`).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{link}}/g, link);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.resetPassword,
    html: mailBody
  };
  
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer reset password');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer reset password');
      return callBack(null, res);
    }
  });
}

exports.createUser = function(email, password, emailVerificationLink, firstName, accountType, callBack){
  // console.log('account type in email service', accountType);
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/createuser.html`).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{accountType}}/g, accountType);
  mailBody = mailBody.replace(/{{email}}/g, email);
  // mailBody = mailBody.replace(/{{password}}/g, password);
  mailBody = mailBody.replace(/{{emailVerificationLink}}/g, emailVerificationLink);
  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.accountCreated,
    html: mailBody
  };
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer creating account');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer creating account');
      return callBack(null, res);
    }
  })
}

exports.createParkingLot = function(email, password, firstName, accountType, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/createuser.html`).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{accountType}}/g, accountType);
  mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{password}}/g, password);
  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.parkingLotCreated,
    html: mailBody
  };
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer creating account');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer creating account');
      return callBack(null, res);
    }
  })
}

exports.sendOtp = function(email, otp, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/sendotp.html`).toString();
  mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{otp}}/g, otp);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.otpHelp,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer otpHelp');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer otpHelp');
      return callBack(null, res);
    }
  })
}

exports.sendParkingPass = function(email, obj, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/parkingpass.html`).toString();
  mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{userFirstName}}/g, obj.userFirstName);
  mailBody = mailBody.replace(/{{transactionId}}/g, obj.transactionId);
  mailBody = mailBody.replace(/{{licensePlateNumber}}/g, obj.licensePlateNumber);
  mailBody = mailBody.replace(/{{zoneNumber}}/g, obj.zone);
  mailBody = mailBody.replace(/{{parkingLotName}}/g, obj.parkingLotName);
  mailBody = mailBody.replace(/{{startTime}}/g, obj.startTime);
  mailBody = mailBody.replace(/{{endTime}}/g, obj.endTime);
  mailBody = mailBody.replace(/{{address}}/g, obj.address);
  mailBody = mailBody.replace(/{{amount}}/g, obj.amount);
  mailBody = mailBody.replace(/{{link}}/g, obj.link);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.parkingPass,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer sendParkingPass');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer sendParkingPass');
      return callBack(null, res);
    }
  })
}

exports.extendTime = function(email, link, firstName, zone, address, zoneName, transactionId, endTime, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/extendtime.html`).toString();
  // mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{firstName}}/g, firstName);
  // mailBody = mailBody.replace(/{{zone}}/g, zone);
  // mailBody = mailBody.replace(/{{address}}/g, address);
  // mailBody = mailBody.replace(/{{zoneName}}/g, zoneName);
  mailBody = mailBody.replace(/{{link}}/g, link);
  // mailBody = mailBody.replace(/{{transactionId}}/g, transactionId);
  // mailBody = mailBody.replace(/{{endTime}}/g, endTime);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.extendParkingTime,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer extendParkingTime');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer extendParkingTime');
      return callBack(null, res);
    }
  })
}

exports.requestForPatroller = function(location, patroller, distance, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/patrollerrequest.html`).toString();
  mailBody = mailBody.replace(/{{patrollerFirstName}}/g, patroller.firstName);
  mailBody = mailBody.replace(/{{patrollerLastName}}/g, patroller.lastName);
  mailBody = mailBody.replace(/{{companyName}}/g, patroller.companyName);
  mailBody = mailBody.replace(/{{patrollerAddress}}/g, patroller.address);
  mailBody = mailBody.replace(/{{patrollerLatitude}}/g, patroller.latitude);
  mailBody = mailBody.replace(/{{patrollerLongitude}}/g, patroller.longitude);
  mailBody = mailBody.replace(/{{patrollingDistanceToCover}}/g, patroller.patrollingDistanceToCover);

  mailBody = mailBody.replace(/{{zone}}/g, location.zone);
  mailBody = mailBody.replace(/{{locationAddress}}/g, location.address);
  mailBody = mailBody.replace(/{{locationLatitude}}/g, location.latitude);
  mailBody = mailBody.replace(/{{locationLongitude}}/g, location.longitude);
  mailBody = mailBody.replace(/{{distance}}/g, distance);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: patroller.email,
    subject: constant.emailSubject.function.newPatrollerRequest(location.zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer requestForPatroller');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer requestForPatroller');
      return callBack(null, res);
    }
  })
}

exports.acceptPatrollerRequest = function(hostFirstName, hostEmail, companyName, zone, address, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/acceptpatrollerrequest.html`).toString();
  mailBody = mailBody.replace(/{{hostFirstName}}/g, hostFirstName);
  mailBody = mailBody.replace(/{{companyName}}/g, companyName);
  // mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{zone}}/g, zone);
  mailBody = mailBody.replace(/{{address}}/g, address);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: hostEmail,
    subject: constant.emailSubject.function.patrollerRequestAccepted(zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer acceptPatrollerRequest');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer acceptPatrollerRequest');
      return callBack(null, res);
    }
  })
}

exports.activatedPatrollerRequest = function(hostFirstName, hostEmail, companyName, zone, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/activatedpatrollerrequest.html`).toString();
  mailBody = mailBody.replace(/{{hostFirstName}}/g, hostFirstName);
  mailBody = mailBody.replace(/{{companyName}}/g, companyName);
  // mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{zone}}/g, zone);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: hostEmail,
    subject: constant.emailSubject.function.patrollerActivated(zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer activatedPatrollerRequest');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer activatedPatrollerRequest');
      return callBack(null, res);
    }
  })
}

exports.patrollerOptOutLocationEmailToHost = function(hostFirstName, hostEmail, companyName, zone, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/patrolleroptoutlocationemailtohost.html`).toString();
  mailBody = mailBody.replace(/{{hostFirstName}}/g, hostFirstName);
  mailBody = mailBody.replace(/{{companyName}}/g, companyName);
  // mailBody = mailBody.replace(/{{email}}/g, email);
  mailBody = mailBody.replace(/{{zone}}/g, zone);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: hostEmail,
    subject: constant.emailSubject.function.patrollerOptOut(zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer patrollerOptOutLocationEmailToHost');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer patrollerOptOutLocationEmailToHost');
      return callBack(null, res);
    }
  })
}

exports.patrollerOptOutLocationEmailToPatroller = function(patrollerEmail, companyName, zone, date, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/patrolleroptoutlocationemailtopatroller.html`).toString();
  mailBody = mailBody.replace(/{{companyName}}/g, companyName);
  mailBody = mailBody.replace(/{{zone}}/g, zone);
  mailBody = mailBody.replace(/{{date}}/g, date);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: patrollerEmail,
    subject: constant.emailSubject.function.patrollerOptOut(zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer patrollerOptOutLocationEmailToPatroller');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer patrollerOptOutLocationEmailToPatroller');
      return callBack(null, res);
    }
  })
}

exports.deletePatroller = function(patrollerCompanName, hostEmail, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/deletePatroller.html`).toString();
  mailBody = mailBody.replace(/{{patrollerCompanName}}/g, patrollerCompanName);
  // mailBody = mailBody.replace(/{{hostEmail}}/g, hostEmail);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: hostEmail,
    subject: constant.emailSubject.patrollerDeleted,
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer deletePatroller');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer deletePatroller');
      return callBack(null, res);
    }
  })
}

// Email sent to patroller if admin or host ends patrol relation
exports.hostEndedPatrolRelation = function(location, patroller, isHost, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/hostendedpatrolrelation.html`).toString();
  mailBody = mailBody.replace(/{{zone}}/g, location.zone);
  mailBody = mailBody.replace(/{{patrollerFirstName}}/g, patroller.firstName);
  mailBody = mailBody.replace(/{{patrollerLastName}}/g, patroller.lastName);
  mailBody = mailBody.replace(/{{hostOrAdmin}}/g, isHost ? 'property manager' : 'Park admin');

  let mailOptions = {
    from: environment.nodemailer.from,
    to: patroller.email,
    subject: constant.emailSubject.function.patrollerRelationEnded(location.zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer hostEndedPatrolRelation');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer hostEndedPatrolRelation');
      return callBack(null, res);
    }
  })
}

// Email sent to host if admin ends patrol relation
exports.adminEndedPatrolRelation = function(location, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/adminendedpatrolrelation.html`).toString();
  mailBody = mailBody.replace(/{{zone}}/g, location.zone);
  mailBody = mailBody.replace(/{{hostFirstName}}/g, location.manager.firstName);
  mailBody = mailBody.replace(/{{hostLastName}}/g, location.manager.lastName);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: location.manager.email,
    subject: constant.emailSubject.function.patrollerRelationEnded(location.zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer adminEndedPatrolRelation');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer adminEndedPatrolRelation');
      return callBack(null, res);
    }
  })
}

exports.adminAssignsPatrollerToLocationEmailToPatroller = function(location, assignOrActivate, assignOrActivateC, distance, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/adminassignspatrollertolocationemailtopatroller.html`).toString();
  mailBody = mailBody.replace(/{{patrollerFirstName}}/g, location.patroller.firstName);
  mailBody = mailBody.replace(/{{patrollerLastName}}/g, location.patroller.lastName);
  mailBody = mailBody.replace(/{{assignOrActivate}}/g, assignOrActivate);
  mailBody = mailBody.replace(/{{assignOrActivateC}}/g, assignOrActivateC);
  mailBody = mailBody.replace(/{{zone}}/g, location.zone);
  mailBody = mailBody.replace(/{{locationAddress}}/g, location.address);
  mailBody = mailBody.replace(/{{patrollerAddress}}/g, location.patroller.address);
  mailBody = mailBody.replace(/{{distance}}/g, distance);

  if(assignOrActivate == 'associated'){
    let message = `Please visit <a href="" target="_blank">log into you account</a> to accept or reject this request within 48 hours.`;
    mailBody = mailBody.replace(/{{message}}/g, message);
  }
  else{
    let message = ``;
    mailBody = mailBody.replace(/{{message}}/g, message);
  }

  let mailOptions = {
    from: environment.nodemailer.from,
    to: location.patroller.email,
    subject: constant.emailSubject.function.adminAssignsPatroller(location.zone, assignOrActivateC),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer adminAssignsPatrollerToLocationEmailToPatroller');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer adminAssignsPatrollerToLocationEmailToPatroller');
      return callBack(null, res);
    }
  })
}

exports.adminAssignsPatrollerToLocationEmailToHost = function(location, assignOrActivate, assignOrActivateC, distance, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/adminassignspatrollertolocationemailtohost.html`).toString();
  mailBody = mailBody.replace(/{{hostFirstName}}/g, location.manager.firstName);
  mailBody = mailBody.replace(/{{hostLastName}}/g, location.manager.lastName);
  mailBody = mailBody.replace(/{{assignOrActivate}}/g, assignOrActivate);
  mailBody = mailBody.replace(/{{assignOrActivateC}}/g, assignOrActivateC);
  mailBody = mailBody.replace(/{{zone}}/g, location.zone);
  mailBody = mailBody.replace(/{{companyName}}/g, location.patroller.companyName);
  mailBody = mailBody.replace(/{{patrollerEmail}}/g, location.patroller.email);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: location.manager.email,
    subject: constant.emailSubject.function.adminAssignsPatroller(location.zone, assignOrActivateC),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer adminAssignsPatrollerToLocationEmailToHost');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer adminAssignsPatrollerToLocationEmailToHost');
      return callBack(null, res);
    }
  })
}

exports.timeExpiryEmailToPatroller = function(location, patroller, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/timeexpiryemailtopatroller.html`).toString();
  mailBody = mailBody.replace(/{{patrollerFirstName}}/g, patroller.firstName);
  mailBody = mailBody.replace(/{{patrollerLastName}}/g, patroller.lastName);
  mailBody = mailBody.replace(/{{zone}}/g, location.zone);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: patroller.email,
    subject: constant.emailSubject.function.timeExpiryPatroller(location.zone),
    html: mailBody
  };
 
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer timeExpiryEmailToPatroller');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer timeExpiryEmailToPatroller');
      return callBack(null, res);
    }
  })
}

exports.verifyEmail = function(email, emailVerificationLink, firstName, callBack){
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/verifyemail.html`).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{link}}/g, emailVerificationLink);

  let mailOptions = {
    from: environment.nodemailer.from,
    to: email,
    subject: constant.emailSubject.verifyEmail,
    html: mailBody
  };
  
  environment.nodemailer.transporter.sendMail(mailOptions, function(err, res){
    if(err){
      console.log(err, 'err in nodemailer verifyEmail');
      return callBack(err, null);
    }
    else{
      console.log(res, 'resp in nodemailer verifyEmail');
      return callBack(null, res);
    }
  });
}