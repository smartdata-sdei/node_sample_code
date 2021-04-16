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
  let mailBody = fs.readFileSync(__dirname+`/../emailTemplate/createuser.html`).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);
  mailBody = mailBody.replace(/{{accountType}}/g, accountType);
  mailBody = mailBody.replace(/{{email}}/g, email);
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
