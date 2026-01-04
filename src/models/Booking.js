import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
      bookingId: {
      type: String,
      unique: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    packageSelected: {
      type: String,
      required: true,
    },
    packegPrice: {
      type: Number,
      required: true,
    },
    advancePayment: {
      type: Number,
      required: false,
      default: 0,
    },
    additionalNotes: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Inquiry", "Confirmed", "In Progress", "Editing", "Ready for Delivery", "Delivered", "Cancelled"],
      default: "Inquiry",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
