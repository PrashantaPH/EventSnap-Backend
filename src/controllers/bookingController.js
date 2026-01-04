import e from "cors";
import Booking from "../models/Booking.js";

// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {
    const {
      clientName,
      email,
      phone,
      eventType,
      eventDate,
      packageSelected,
      packegPrice,
      advancePayment,
      additionalNotes,
    } = req.body;

    const bookingCount = await Booking.countDocuments();
    const nextId = (bookingCount + 1).toString().padStart(3, "0");
    const customBookingId = `BK${nextId}`;

    const newBooking = new Booking({
      bookingId: customBookingId,
      clientName,
      email,
      phone,
      eventType,
      eventDate,
      packageSelected,
      packegPrice,
      advancePayment,
      additionalNotes,
      status: "Inquiry", // default status
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

//================== VIEW BOOKINGS =================
export const viewBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

//================== GET BOOKING =================
export const getBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findOne({
      bookingId: bookingId,
    });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully",
      booking,
    });
  } catch (error) {
    error.status = 500;
    throw error;
  }
};
