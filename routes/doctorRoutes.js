const express = require("express");
const authMiddleware = require("../middelwares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const router = express.Router();

//Post Single Doctor Info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//Post Update Profile
router.post("/updateProfile", authMiddleware, updateProfileController);

//Post Get Single Doctor Info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//Get Appointment
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

//Post Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
