const loginController = require("../modules/login/Controller/loginController");
const dashbordController = require("../modules/login/Controller/dashbordController");
const payoutController = require("../modules/login/Controller/payoutController");
const depositsController = require("../modules/login/Controller/deposits_controller");
const route = require("express").Router();
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    let imgname = new Date().toString();
    imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
    let imgext = path.extname(file.originalname);
    let image = `${imgname}${imgext}`;
    cb(null, image);
  },
});
const uploads = multer({ storage: storage });

const helper = require("../helper/jwt");
const username = require("../helper/username");
const dashboardCount = require("../modules/login/Controller/dashbordController");
// const email_validate = require("../helper/email-validation");

const views = path.join(__dirname, "../views/");

// routes
route.get("/", (req, res) => {
  console.log(views);
  res.sendFile(views + "index.html");
});

route.post("/register", uploads.none(), loginController.register);
route.post(
  "/save-company-profile",
  uploads.none(),
  helper.verify,
  loginController.company_profile
);

route.post(
  "/save_shareholder_info",
  uploads.none(),
  helper.verify,
  loginController.save_shareholder_info
);
route.post(
  "/save_business_info",
  uploads.none(),
  helper.verify,
  loginController.save_business_info
);
route.post(
  "/save_settelment_info",
  uploads.none(),
  helper.verify,
  loginController.save_settelment_info
);

route.post("/login", uploads.none(), loginController.login);

// country of incorporation
route.post(
  "/country-list",
  uploads.none(),
  helper.verify,
  loginController.get_countries
);
route.post(
  "/solution-apply",
  uploads.none(),
  helper.verify,
  loginController.get_solution_apply
);
route.post(
  "/save-country-solution-apply",
  uploads.none(),
  helper.verify,
  loginController.save_country_solution_apply
);
route.post(
  "/save-director-info",
  uploads.none(),
  helper.verify,
  loginController.save_director_info
);

//,
// route.post('/user-login', uploads.none(), userController.login);
// route.post('/user-list', uploads.none(), helper.verify, userController.get_users);

route.post("/sqltest", uploads.none(), helper.verify, loginController.testsql);

// dashboard controller

route.post(
  "/top_transaction_today",
  uploads.none(),
  helper.verify,
  dashbordController.top_transaction_today
);
route.post("/dpc", uploads.none(), helper.verify, dashbordController.dpc);
route.post(
  "/card_data",
  uploads.none(),
  helper.verify,
  dashbordController.card_data
);

route.post(
  "/success_rate",
  uploads.none(),
  helper.verify,
  dashbordController.success_rate
);
route.post(
  "/payment_type",
  uploads.none(),
  helper.verify,
  dashbordController.payment_type
);

//deposits controller

route.post(
  "/show_all",
  uploads.none(),
  helper.verify,
  depositsController.defaultOrder
);



route.get(
  "/downloadReports",
  uploads.none(),
  helper.verify,
  depositsController.downloadReports
);

route.post(
  "/statusResult",
  uploads.none(),
  helper.verify,
  depositsController.statusResult
);
route.post(
  "/searchDateFilter",
  uploads.none(),
  helper.verify,
  depositsController.searchDateFilter
);

// Payout Router 

route.post("/filter", uploads.none(), helper.verify, payoutController.filter);
route.post(
  "/payoutheader",
  uploads.none(),
  helper.verify,
  payoutController.payoutheader
);




module.exports = route;
