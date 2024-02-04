const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailbilityController,
  userAppointmentController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middelwares/authMiddleware");

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//Notification Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//Get All Doctor
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//Book Appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

//Book Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailbilityController
);

//Appointent List
router.get("/user-appointments", authMiddleware, userAppointmentController);

module.exports = router;
