import express from "express";
import {
  createBooking,
  viewBookings,
  getBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
router.post("/create-booking", createBooking);
router.get("/view-bookings", viewBookings);
router.get("/:bookingId", getBooking);

export default router;
