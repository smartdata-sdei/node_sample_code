var _ = require('lodash')
var constant = require('../config/constants')
const utility = require('../config/utility')
const moment = require('moment')
const transactionmodel = require('../model/tansaction');
const companynmodel = require('../model/company');
const query = require('../config/common_query')
const { createInvoice, mailToInvoice } = require("../lib/utils");
const { object } = require('underscore');
const { isEmpty, conforms } = require('lodash');


const filte = {
    startDate: new Date(moment().subtract(0, 'day')),
    endDate: new Date(moment.now()),
}

const sendScheduledInvoice = (req, res) => {
    const sendScheduled_Invoice = async () => {
        try {
            const { params } = req;

            let result = await transactionmodel.aggregate([
                {
                    $match: {
                        type: 'Pin',
                        createdAt: { $gte: filte.startDate, $lt: filte.endDate }
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $lookup: {
                        from: "driverstatuses",
                        localField: "jobid",
                        foreignField: "_id",
                        as: "jobid"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "jobid.driverdetails",
                        foreignField: "_id",
                        as: "driverdetails"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "jobid.riderdetails",
                        foreignField: "_id",
                        as: "riderdetails"
                    }
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "pin",
                        foreignField: "key",
                        as: "company"
                    }
                },
                {
                    $group: {
                        "_id": { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        "data": { "$push": "$$ROOT" },
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ])


            console.log('sdfsd', result, filte)
            if (!isEmpty(result)) {
                let count = 0;

                let final = {};

                result.forEach(element => {
                    const { _id: date, data } = element;
                    final = { ...final, [date]: {} };
                    let selectedCompany = '';
                    let invoiceArray = {};

                    data.forEach((e) => {
                        const { type, status, fare, tax, Amount, jobid, _id: transactionID, user, driverdetails, company } = e;
                        const { pickupLocation, dropLocation, distance, dateOfJourney, pickUptime } = jobid[0]
                        // if (final[date] && final[date][e.company[0]._id]) {
                        //     final[date][e.company[0]._id] = [...final[date][e.company[0]._id], { ...e, driverdetails: e.driverdetails[0], user: e.user[0], jobid: e.jobid[0], company: e.company[0], riderdetails: e.riderdetails[0] }]
                        // } else {
                        //     final[date][e.company[0]._id] = [{ ...e, driverdetails: e.driverdetails[0], user: e.user[0], jobid: e.jobid[0], company: e.company[0], riderdetails: e.riderdetails[0] }]
                        // }
                        if (invoiceArray[company[0]._id]) {
                            invoiceArray[company[0]._id].items.push({
                                driverName: driverdetails[0].name ? driverdetails[0].name : '',
                                userName: user[0].name ? user[0].name : '',
                                pickupLocation: pickupLocation.address ? pickupLocation.address : '',
                                dropLocation: dropLocation.address ? dropLocation.address : '',
                                distance: distance ? distance : 0,
                                Amount: fare ? fare : 0,
                            });

                            invoiceArray[company[0]._id].subtotal += fare ? Number(fare) : 0;
                            invoiceArray[company[0]._id].tax += tax ? Number(tax) : 0;
                            invoiceArray[company[0]._id].total += Amount ? Number(Amount) : 0;
                            invoiceArray[company[0]._id].paid += status === 'completed' ? Number(Amount) : 0;
                            invoiceArray[company[0]._id].due += status !== 'completed' ? Number(Amount) : 0;

                        } else {
                            selectedCompany = e.company[0]._id;

                            invoiceArray[company[0]._id] = {
                                items: [{
                                    driverName: driverdetails[0].name ? driverdetails[0].name : '',
                                    userName: user[0].name ? user[0].name : '',
                                    pickupLocation: pickupLocation.address ? pickupLocation.address : '',
                                    dropLocation: dropLocation.address ? dropLocation.address : '',
                                    distance: distance ? distance : 0,
                                    Amount: fare ? Number(fare) : 0,

                                }]
                            };

                            invoiceArray[company[0]._id].user = {
                                name: company[0].name ? company[0].name : '',
                                address: `${company[0].city ? company[0].city + ',' : ''} ${company[0].state ? company[0].state + ',' : ''} ${company[0].postcode ? company[0].postcode + ',' : ''}`,
                                postal_code: company[0].postalcode ? company[0].postalcode : '',
                                city: company[0].city ? company[0].city : '',
                                state: company[0].state ? company[0].state : '',
                                county: company[0].county ? company[0].county : ''
                            }

                            invoiceArray[company[0]._id].inVoiceDate = dateOfJourney ? dateOfJourney : '';
                            invoiceArray[company[0]._id].paymentType = type ? type : '';
                            invoiceArray[company[0]._id].subtotal = fare ? fare : 0;
                            invoiceArray[company[0]._id].tax = tax ? tax : 0;
                            invoiceArray[company[0]._id].total = Amount ? Amount : 0;
                            invoiceArray[company[0]._id].paid = status === 'completed' ? Number(Amount) : 0;
                            invoiceArray[company[0]._id].due = status !== 'completed' ? Number(Amount) : 0;
                            invoiceArray[company[0]._id].invoice_nr = transactionID;
                            invoiceArray[company[0]._id].email = company[0].email;
                        }
                    })

                    Object.keys(invoiceArray).forEach((invoice) => {
                        const location = createInvoice(invoiceArray[invoice], invoice);
                        console.log('file', location, invoiceArray[invoice])
                        mailToInvoice(invoiceArray[invoice].email, location, (err, response) => {
                            if (err) utility.errorhandler(res, response);
                            utility.sucesshandler(res, constant.messages.invoiceMailSent, {});
                        })
                    })


                    mailToInvoice(userEmail, location, (err, response) => {
                        if (err) utility.errorhandler(res, response);
                        utility.sucesshandler(res, constant.messages.invoiceMailSent, {});
                    })
                });

                // Object.keys(final).forEach((datewise) => {
                //     Object.keys(final[datewise]).forEach(companyWise => {
                //         // console.log('hessddf', final[datewise][companyWise])

                //     })

                //     const { type, status, fare, tax, Amount, jobid, _id: transactionID, user, driverdetails, } = data;
                //     if (jobid && driverdetails && user && jobid.pickupLocation && jobid.dropLocation && user.email) {
                //         const { pickupLocation, dropLocation, distance, dateOfJourney, pickUptime } = jobid

                //         // if (!user.email) throw { messfage: "user email is not register with us please" }
                //         let invoice = {
                //             items: [],
                //             user: {},
                //             inVoiceDate: '',
                //             paymentType: '',
                //             tax: 0,
                //             subtotal: 0,
                //             total: 0,
                //             paid: 0,
                //             due: 0,
                //             invoice_nr: ''
                //         }

                //         invoice = {
                //             items: [
                //                 {
                //                     driverName: driverdetails.name ? driverdetails.name : '',
                //                     userName: user.name ? user.name : '',
                //                     pickupLocation: pickupLocation.address ? pickupLocation.address : '',
                //                     dropLocation: dropLocation.address ? dropLocation.address : '',
                //                     distance: distance ? distance : 0,
                //                     Amount: fare ? fare : 0,
                //                 },
                //             ],
                //             user: {
                //                 name: user.name ? user.name : '',
                //                 address: `${user.city ? user.city + ',' : ''} ${user.state ? user.state + ',' : ''} ${user.postcode ? user.postcode + ',' : ''}`,
                //                 postal_code: user.postalcode ? user.postalcode : '',
                //                 city: user.city ? user.city : '',
                //                 state: user.state ? user.state : '',
                //                 county: user.county ? user.county : ''
                //             },

                //             inVoiceDate: dateOfJourney ? dateOfJourney : '',
                //             paymentType: type ? type : '',
                //             tax: tax ? tax : 0,
                //             subtotal: fare ? fare : 0,
                //             total: fare && tax ? fare + tax : 0,
                //             paid: status === 'completed' ? Amount : 0,
                //             due: status !== 'completed' ? Amount : 0,
                //             invoice_nr: transactionID
                //         }

                //         const location = createInvoice(invoice, transactionID);

                //         mailToInvoice(userEmail, location, (err, response) => {
                //             if (err) utility.errorhandler(res, response);
                //             utility.sucesshandler(res, constant.messages.invoiceMailSent, {});
                //         })
                //     }
                // })

                // console.log('fiank', final)
            }



            // if (result.status) {

            //     const { data } = result
            //     
            //     // 
            // }
            // else {
            //     utility.sucesshandler(res, constant.validationMessages.intenalError);
            // }
        }
        catch (e) {
            console.log('hherhee sis issue --   -  -', e)
            return res.json({ code: 500, message: e.message || constant.validationMessages.intenalError, data: {} })
        }
    }
    sendScheduled_Invoice()
}


module.exports = {
    sendScheduledInvoice
}