// login
import { connectDB } from "@/lib/config/db"; // Adjust the path as necessary
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_API,
    },
  });

  await transporter.sendMail({
    from: '"Everyday Echoes" <no-reply@everydayechoes.com>',
    to: email,
    subject: "Your OTP for Log In",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333;">Welcome Back to Everyday Echoes!</h2>
        <p style="color: #555; font-size: 16px;">
            To complete your log in, please use the OTP below:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</span>
        </div>
        <p style="color: #555; font-size: 16px;">
          If you didn't request this, please ignore this email.
        </p>
        <p style="color: #777; font-size: 14px; text-align: center; margin-top: 40px;">
          © 2024 Everyday Echoes. All rights reserved.
        </p>
      </div>
    `,
  });
};

// Handler for the login
export async function POST(req) {
  try {
    const { email, otp, step } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const db = await connectDB();
    const collection = db.collection('users');

    // Check if email already exists in the database
    const existingUser = await collection.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: 'Email not found. Please register.' }, { status: 400 });
    }

    if (step === 1) {

      let otp;
      if (email.toLowerCase() === 'admin989@gmail.com') {
        // Set the OTP as 87658 for the specific admin email
        otp = '87658';
      } else {
        // Generate dynamic OTP for all other users
        otp = generateOTP();
      }

      // const otp = generateOTP();
      await sendOTP(email, otp);
      // Save the OTP to the database (for verification later)
      await collection.updateOne(
        { email },
        { $set: { otp } } // Remove expiry
      );
      return NextResponse.json({ message: 'OTP sent' });
    }

    if (step === 2) {
      const subscriber = await collection.findOne({ email });

      if (!subscriber || subscriber.otp !== otp) {
        return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
      }

      // OTP verified
      await collection.updateOne(
        { email },
        { $set: { verified: true }, $unset: { otp: "" } }
      );

      // Generate JWT token
      const token = jwt.sign({ name: subscriber.name, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Login successful
      return NextResponse.json({ message: `Hi ${subscriber.name}`, username: subscriber.name, token });
    }

    return NextResponse.json({ error: 'Invalid step' }, { status: 400 });
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
  }
}





