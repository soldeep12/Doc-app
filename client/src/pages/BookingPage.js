import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  TimePicker,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from "moment";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  //login User data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ********* Booking Func *********
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    // <Layout>
    //   <h3 className="text-center m-2">Booking Page</h3>
    //   <div className="container m-2">
    //     {doctors && (
    //       <div>
    //         <h4>
    //           Dr. {doctors.firstName} {doctors.lastName}
    //         </h4>
    //         <h4>Fees : {doctors.feePerConsaltantion}</h4>
    //         <h4>{/* Timings : {doctors.timing[0]} - {doctors.timing[1]} */}</h4>
    //         <div className="d-flex flex-column w-50">
    //           <DatePicker
    //             className="m-2"
    //             format="DD-MM-YYYY"
    //             onChange={(value) => {
    //               setDate(moment(value).format("DD-MM-YYYY"));
    //             }}
    //           />
    //           <TimePicker
    //             className="m-2"
    //             format="HH:mm"
    //             onChange={(value) => {
    //               setTime(moment(value).format("HH:mm"));
    //             }}
    //           />
    //           <button
    //             className="btn btn-primary mt-2"
    //             onClick={handleAvailability}
    //           >
    //             Check Availability
    //           </button>
    //           <button className="btn btn-dark mt-2" onClick={handleBooking}>
    //             Book Now
    //           </button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </Layout>

    //New

    <Layout>
      {doctors && (
        <div>
          <h1 className="page-title">
            Dr. {doctors.firstName} {doctors.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                {/* <b>Timings :</b> {doctors.timings[0]} - {doctors.timings[1]} */}
              </h1>
              <p>
                <b>Phone Number : </b>
                {doctors.phone}
              </p>
              <p>
                <b>Address : </b>
                {doctors.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {doctors.feePerConsaltantion}
              </p>
              <p>
                <b>Website : </b>
                {doctors.website}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookingPage;
