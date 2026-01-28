import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(
        "http://localhost:5678/webhook/lead-capture",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            source: "website",
          }),
        },
      );

      if (response.ok) {
        setStatus("success");
        setSubmitMessage("Thanks you! We'll be in touch soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setSubmitMessage("Something went wrong, Please try again");
      console.log(err);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
            <p className="text-blue-200">
              Let's capture your business opportunity
            </p>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center gap-3">
              <CheckCircle className="text-green-300" size={20} />
              <p className="text-green-100 text-sm">{submitMessage}</p>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center gap-3">
              <AlertCircle className="text-red-300" size={20} />
              <p className="text-red-100 text-sm">{submitMessage}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border ${
                  errors.name ? "border-red-400/50" : "border-white/30"
                } rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-300">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border ${
                  errors.email ? "border-red-400/50" : "border-white/30"
                } rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition`}
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-300">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border ${
                  errors.phone ? "border-red-400/50" : "border-white/30"
                } rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-300">{errors.phone}</p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition"
                placeholder="Acme Inc."
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Lead
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-blue-200/60 text-center mt-6">
            Your information is secure and will never be shared.
          </p>
        </div>
      </div>
    </div>
  );
}
