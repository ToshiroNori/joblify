import React from "react";
import { sendOTP, verifyOTP } from "@/features/auth/OTP/otpSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CardContent } from "./ui/card";
import { Check } from "lucide-react";
import { Label } from "./ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./ui/input-otp";
import { CardDescription } from "./ui/card";
import { Button } from "./ui/button";

export default function OtpForm({ verify_success, otp_loading }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  return (
    <CardContent className="space-y-4 mt-5">
      <Label>One-Time Password</Label>
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <CardDescription>
        Didn't receive the OTP?
        <Button
          variant="link"
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(sendOTP());
          }}
        >
          Resend
        </Button>
      </CardDescription>

      <Button
        disabled={verify_success}
        onClick={() => {
          if (otp.trim().length === 0) return toast.info("OTP field is empty");
          if (otp.length !== 6)
            return toast.error("OTP must be exactly 6 digits");
          if (/[A-Za-z]/.test(otp))
            return toast.error("OTP must contain only digits (0–9)");
          if (!otp_loading || !success) dispatch(verifyOTP(otp));
        }}
      >
        {verify_success ? "Verified" : "Verify"}
        <Check />
      </Button>
    </CardContent>
  );
}
