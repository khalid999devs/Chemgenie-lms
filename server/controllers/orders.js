const {
  courses,
  notifications,
  orders,
  clients,
  clientcourses,
  sequelize,
  Sequelize,
  recordedclasses,
} = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
  CustomAPIError,
} = require('../errors');
const mailer = require('../utils/sendMail');
const { Op } = require('sequelize');
const sendSMS = require('../utils/sendSMS');
const fs = require('fs');
const path = require('path');

// const SSLCommerzPayment = require('sslcommerz-lts');
// const store_id = process.env.SSLCMZ_STORE_ID;
// const store_passwd = process.env.SSLCMZ_STORE_PASS;
// const is_live = false; //true for live, false for sandbox

const paymentInit = async (req, res) => {
  const paymentData = req.body;
  const course = await courses.findByPk(paymentData.courseId);
  if (!course) {
    throw new NotFoundError(
      'Course not found! Please Enter valid informations! '
    );
  }
  const id = req.user.id;
  const isOrderExist = await orders.findOne({
    where: { [Op.and]: [{ courseId: paymentData.courseId }, { clientId: id }] },
  });
  if (isOrderExist) {
    throw new BadRequestError('You have already purchased this course');
  }
  const orderData = {
    courseId: paymentData.courseId,
    clientId: req.user.id,
    paymentInfo: JSON.stringify({
      ...paymentData,
      courseTitle: course.title,
      userInfo: req.user,
    }),
    createdDate: Date.now().toString(),
  };
  await orders.create(orderData);

  res.json({
    succeed: true,
    msg: 'Successfully submitted your info. Please wait for the verification by admin.',
  });

  // const trans_id = `${req.user.id}${Date.now().toString().slice(-4)}${Math.ceil(
  //   Math.random() * 100
  // )}`;

  // const data = {
  //   total_amount: course.estimatedPrice,
  //   currency: paymentData.currType,
  //   tran_id: trans_id, // use unique tran_id for each api call
  //   success_url: `${
  //     process.env.SERVER_DOMAIN
  //   }/api/order/validate-payment/${trans_id}?cDomain=${encodeURIComponent(
  //     paymentData.domOrigin
  //   )}&courseId=${paymentData.courseId}&clientId=${req.user.id}`,
  //   fail_url: `${paymentData.domOrigin}/courses/enroll/payment/${paymentData.courseId}/failed`,
  //   cancel_url: `${paymentData.domOrigin}/courses/enroll/payment/${paymentData.courseId}/cancel`,
  //   ipn_url: `${process.env.SERVER_DOMAIN}/ipn?courseId=${paymentData.courseId}&clientId=${req.user.id}`,
  //   shipping_method: 'Courier',
  //   product_name: 'Computer.',
  //   product_category: 'Electronic',
  //   product_profile: 'general',
  //   cus_name: paymentData.name,
  //   cus_email: 'customer@example.com',
  //   cus_add1: paymentData.address,
  //   cus_add2: 'Dhaka',
  //   cus_city: 'Dhaka',
  //   cus_state: 'Dhaka',
  //   cus_postcode: paymentData.postCode,
  //   cus_country: 'Bangladesh',
  //   cus_phone: paymentData.phone,
  //   cus_fax: '01711111111',
  //   ship_name: 'Customer Name',
  //   ship_add1: 'Dhaka',
  //   ship_add2: 'Dhaka',
  //   ship_city: 'Dhaka',
  //   ship_state: 'Dhaka',
  //   ship_postcode: 1000,
  //   ship_country: 'Bangladesh',
  // };

  // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  // sslcz
  //   .init(data)
  //   .then(async (apiResponse) => {
  //     // Redirect the user to payment gateway
  //     let GatewayPageURL = apiResponse.GatewayPageURL;

  //     // res.redirect(GatewayPageURL);
  //     res.json({
  //       succeed: true,
  //       msg: 'Successfully initialized payment',
  //       url: GatewayPageURL,
  //     });

  //     const orderData = {
  //       courseId: paymentData.courseId,
  //       clientId: req.user.id,
  //       paymentInfo: JSON.stringify({
  //         paidStatus: false,
  //         ...paymentData,
  //         trnasactionId: trans_id,
  //       }),
  //       createdDate: Date.now().toString(),
  //     };
  //     await orders.create(orderData);
  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     throw new CustomAPIError(err.message);
  //   });
};

const isFromSSLCommerz = async (req, state) => {
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  // console.log('from isFromsslcommez', req.body);
  if (req.body?.val_id) {
    try {
      const resData = await sslcz.validate({ val_id: req.body.val_id });
      if (state === 'INFO') {
        return {
          validity:
            resData.status === 'VALID' || resData.status === 'VALIDATED',
          resData,
        };
      }
      return resData.status === 'VALID' || resData.status === 'VALIDATED';
    } catch (error) {
      console.error('Error validating SSLCommerz- with val_id', error);
      return false;
    }
  } else {
    const transId = req.params.tranId;
    try {
      const resData = await sslcz.transactionQueryByTransactionId({
        tran_id: transId,
      });

      if (state === 'INFO') {
        return {
          validity:
            resData.element[0].status === 'VALID' ||
            resData.element[0].status === 'VALIDATED',
          resData,
        };
      }
      return (
        resData.element[0].status === 'VALID' ||
        resData.element[0].status === 'VALIDATED'
      );
    } catch (error) {
      console.error('Error validating SSLCommerz with transactionId', error);
      return false;
    }
  }
};

const ipnListener = async (req, res) => {
  const { courseId, clientId } = req.query;
  try {
    const isValid = await isFromSSLCommerz(req, 'INFO');

    if (isValid.validity) {
      const paymentInfo = {
        paidStatus: true,
        ...isValid.resData,
        trnasactionId: isValid.resData.tran_id,
      };
      await createOrder(
        req,
        res,
        paymentInfo.trnasactionId,
        courseId,
        paymentInfo,
        clientId
      );
      res.status(200).json({ msg: 'Successful' });
    } else {
      await orders.destroy({ where: { courseId, clientId } });
      res.status(200).json({ msg: 'failed' });
    }
  } catch (error) {
    await orders.destroy({ where: { courseId, clientId } });
    console.error('Error processing IPN:', error);
    res.status(500).send('Internal Server Error');
  }
};

const createOrder = async (
  req,
  res,
  trans_Id,
  courseId,
  paymentInfo,
  clientId
) => {
  const user = await clients.findByPk(clientId);
  if (!user) throw new UnauthenticatedError('client Id is not valid!');

  const timeMil = Date.now();
  const invoiceNo = `#${
    Math.ceil(Math.random() * 10) + timeMil.toString().slice(-4)
  }`;

  // let dueInMil = timeMil + 30 * 24 * 60 * 60 * 1000;
  // if (course.feeInterval === 'full') {
  //   dueInMil =
  //     timeMil + parseInt(course.durationMonth) * 30 * 24 * 60 * 60 * 1000;
  // }
  const course = await courses.findByPk(courseId);
  const orderData = {
    paymentInfo: paymentInfo ? JSON.stringify(paymentInfo) : '{}',
    createdDate: timeMil,
    invoiceNo,
  };
  await orders.update(
    { ...orderData },
    { where: { courseId: courseId, clientId: user.id } }
  );

  await clientcourses.create({ courseId: course.id, clientId: user.id });
  course.purchased = course.purchased + 1;
  await course.save();

  //send notifications
  const notification = await notifications.create({
    title: 'New purchase made',
    message: `A new purchase for ${course.title} was made by ${user.userName}`,
  });

  //sending sms and mail
  if (user.phone) {
    sendSMS(
      user.phone,
      `You purchase for ${course.title} is successful. Your order id is: ${invoiceNo} `
    )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  if (user.email) {
    mailer(
      {
        client: {
          fullName: user.fullName,
          email: user.email,
        },
        info: {
          invoiceNo,
          courseName: course.title,
          paymentInfo: paymentInfo,
        },
      },
      'order'
    ).catch((err) => {});
  }
};

const validatePayment = async (req, res) => {
  const transId = req.params.tranId;
  const { cDomain, courseId, clientId } = req.query;

  const isValid = await isFromSSLCommerz(req);

  if (isValid) {
    res.redirect(
      `${cDomain}/courses/enroll/payment/${Number(courseId)}/succeed`
    );
  } else {
    res.redirect(
      `${cDomain}/courses/enroll/payment/${Number(courseId)}/failed`
    );
  }
};

//for admin
const getAllPendingOrders = async (req, res) => {
  let result = await orders.findAll({
    where: { paidStatus: false },
    order: [['id', 'DESC']],
  });
  result = result.map((item) => {
    item.dataValues.paymentInfo = JSON.parse(item.dataValues.paymentInfo);
    return item;
  });
  res.json({
    succeed: true,
    msg: 'Successful',
    result,
  });
};

const getAllClientBasedOrders = async (req, res) => {
  const query = `
  SELECT o.*,c.title,c.price
  FROM orders AS o
  RIGHT JOIN courses AS c ON o.courseId = c.id
  WHERE o.clientId = ${req.user.id}
  ORDER BY o.id DESC
`;
  let result = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  result = result.map((item) => {
    item.paymentInfo = JSON.parse(item.paymentInfo);
    return item;
  });
  res.json({
    succeed: true,
    msg: 'Successful',
    result,
  });
};

//for admin
const confirmSingleOrder = async (req, res) => {
  const { clientId, courseId } = req.body;
  if (!clientId || !courseId) {
    throw new BadRequestError(
      'Please provide the both clientId and courseId of the client!'
    );
  }
  const user = await clients.findByPk(clientId);
  if (!user) throw new UnauthenticatedError('client Id is not valid!');

  const timeMil = Date.now();
  const invoiceNo = `#${
    Math.ceil(Math.random() * 10) + timeMil.toString().slice(-4)
  }`;

  const course = await courses.findByPk(courseId);
  const orderData = {
    paidStatus: true,
    createdDate: timeMil,
    invoiceNo,
  };
  await orders.update(
    { ...orderData },
    { where: { courseId: courseId, clientId: user.id } }
  );

  // if (course.isLockVidFeature) {}
  //get all recorded class and setup lockstates
  const allRecordedClasses = await recordedclasses.findAll({
    attributes: ['id', 'isFirst'],
    where: { courseId: courseId },
  });

  let redVidLockState = {};
  let recVidDoneState = {};
  let recVidPlTimeState = {};

  allRecordedClasses.forEach((item, i) => {
    redVidLockState[item.id] = i == 0 || item.isFirst == true ? 0 : 1;
    recVidDoneState[item.id] = 0;
    recVidPlTimeState[item.id] = 10;
  });

  await clientcourses.create({
    courseId: course.id,
    clientId: user.id,
    redVidLockState: JSON.stringify(redVidLockState),
    recVidDoneState: JSON.stringify(recVidDoneState),
    recVidPlTimeState: JSON.stringify(recVidPlTimeState),
    currentPlVidId: allRecordedClasses[0]?.id || 'next',
  });
  course.purchased = course.purchased + 1;
  await course.save();

  res.json({
    succeed: true,
    msg: 'Successfully confirmed the order',
  });
  //send notifications
  const notification = await notifications.create({
    title: 'New purchase made',
    message: `A new purchase for ${course.title} was made by ${user.userName}`,
  });

  //sending sms and mail
  if (user.phone) {
    sendSMS(
      user.phone,
      `You purchase for "${course.title}" is successful. Your order id is: ${invoiceNo} \n --ChemGenie`
    )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  if (user.email) {
    mailer(
      {
        client: {
          fullName: user.fullName,
          email: user.email,
        },
        info: {
          invoiceNo,
          courseName: course.title,
          paymentInfo: {
            invoiceNo,
          },
        },
      },
      'order'
    ).catch((err) => {});
  }
};

//for admin
const getAllVerifiedOrders = async (req, res) => {
  let result = await orders.findAll({
    where: { paidStatus: true },
    order: [['id', 'DESC']],
  });
  result = result.map((item) => {
    item.dataValues.paymentInfo = JSON.parse(item.dataValues.paymentInfo);
    return item;
  });
  res.json({
    succeed: true,
    msg: 'Successful',
    result,
  });
};

const clientInvoices = async (req, res) => {
  const userId = req.user.id;
  const invoices = await orders.findAll({ where: { clientId: userId } });
  if (invoices.length > 0) {
    invoices.forEach((invoice) => {
      invoice.paymentInfo = JSON.parse(invoice.paymentInfo);
    });
  }
  res.json({
    succeed: true,
    msg: 'Successful',
    invoices,
  });
};

const removeStudentFromCourse = async (req, res) => {
  const { courseId, clientId, invoiceNo, orderId } = req.body;

  if (!courseId || !clientId || !invoiceNo || !orderId) {
    throw new BadRequestError(
      'CourseId, ClientId and InvoiceNo must be provided'
    );
  }

  const targetClientCourse = await clientcourses.findOne({
    where: { courseId, clientId },
  });
  if (!targetClientCourse) {
    throw new UnauthorizedError(
      'You cannot remove this student, wrong info provided!'
    );
  }

  const targetOrder = await orders.findOne({
    where: { id: orderId },
  });
  if (!targetOrder) {
    throw new UnauthenticatedError(
      'You cannot remove this student, wrong info provided!'
    );
  }

  const removedStudentInfo = {
    orderId,
    courseId,
    clientId,
    invoiceNo,
    removedAt: new Date().toISOString(),
  };

  const logPath = path.join(__dirname, '..', 'logs', 'removed', 'students.txt');
  const logEntry = JSON.stringify(removedStudentInfo) + ',\n';

  fs.mkdir(path.dirname(logPath), { recursive: true }, (err) => {
    if (err) console.error('Error creating log directory:', err);
    fs.appendFile(logPath, logEntry, (err) => {
      if (err) console.error('Error writing to log file:', err);
    });
  });

  await targetClientCourse.destroy();
  await targetOrder.destroy();

  res.json({
    succeed: true,
    msg: 'Successfully removed the student from the course!',
  });
};

module.exports = {
  createOrder,
  getAllVerifiedOrders,
  clientInvoices,
  paymentInit,
  validatePayment,
  isFromSSLCommerz,
  ipnListener,
  getAllPendingOrders,
  confirmSingleOrder,
  getAllClientBasedOrders,
  removeStudentFromCourse,
};
