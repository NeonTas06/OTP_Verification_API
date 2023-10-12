import axios from "axios";
import { URLSearchParams } from "url";
import dotenv from "dotenv";

dotenv.config();
export class Procontroller {
  async requestOtp(req, res) {
    let { msisdn } = req.body;
    if (!msisdn) {
      return res
        .status(400)
        .json({ error: "Missing 'msisdn' in the request." });
    }
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set("key", `${process.env.KEY}`);
      encodedParams.set("secret", `${process.env.SECRET_KEY}`);
      encodedParams.set("msisdn", msisdn);
      const options = {
        method: "POST",
        url: "https://otp.thaibulksms.com/v2/otp/request",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      console.log(response.data);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while sending the OTP request." });
    }
  }

  async verifyOtp(req, res) {
    const { pin, token } = req.body;
    if (!pin || !token) {
      return res
        .status(400)
        .json({ error: "Missing 'pin' or 'token' in the request." });
    }
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set("pin", pin);
      encodedParams.set("secret", `${process.env.KEY}`);
      encodedParams.set("key", `${process.env.SECRET_KEY}`);
      encodedParams.set("token", token);
      console.log(encodedParams);
      const options = {
        method: "POST",
        url: "https://otp.thaibulksms.com/v2/otp/verify",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
        data: encodedParams,
      };
      console.log(options);
      const response = await axios.request(options);
      console.log(response.data);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while verifying the OTP." });
    }
  }
}
