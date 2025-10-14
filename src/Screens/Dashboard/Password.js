import React, { useState } from "react";
import { Input } from "../../components/UsedInputs";
import SideBar from "./SideBar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Password() {
  const [show, setShow] = useState({
    prev: false,
    new: false,
    confirm: false,
  });

  const [form, setForm] = useState({
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const toggle = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

  // normalize value to string always
  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: String(value) }));
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { prevPassword, newPassword, confirmPassword } = form;

    // Basic validation
    if (!prevPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // Validate password strength
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      alert(passwordErrors[0]);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert("Password changed successfully!");

      // Refresh the page
      window.location.reload();

    } catch (error) {
      console.error("Password change error:", error);
      alert("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Previous Password */}
          <div className="relative">
            <Input
              label="Current Password"
              type={show.prev ? "text" : "password"}
              placeholder="Enter your current password"
              bg
              value={form.prevPassword}
              onChange={(e) => handleChange("prevPassword", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => toggle("prev")}
              className="absolute right-5 top-11 text-gray-400 hover:text-gray-600"
            >
              {show.prev ? (
                <AiFillEyeInvisible className="w-8 h-8" />
              ) : (
                <AiFillEye className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
              label="New Password"
              type={show.new ? "text" : "password"}
              placeholder="Enter your new password"
              bg
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => toggle("new")}
              className="absolute right-5 top-11 text-gray-400 hover:text-gray-600"
            >
              {show.new ? (
                <AiFillEyeInvisible className="w-8 h-8" />
              ) : (
                <AiFillEye className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={show.confirm ? "text" : "password"}
              placeholder="Confirm your new password"
              bg
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => toggle("confirm")}
              className="absolute right-5 top-11 text-gray-400 hover:text-gray-600"
            >
              {show.confirm ? (
                <AiFillEyeInvisible className="w-8 h-8" />
              ) : (
                <AiFillEye className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Password Requirements */}
          <div className="text-sm text-gray-400">
            <p className="mb-2 font-medium">Password requirements:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>At least 8 characters long</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
            </ul>
          </div>

          {/* Submit */}
          <div className="flex justify-end items-center my-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 w-full font-medium text-white rounded border bg-main transitions hover:bg-subMain border-subMain sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </SideBar>
  );
}

export default Password;
