import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
// API service import (adjust path as per your folder structure)
import { addContactUs } from "services/home/PagesApis/pages";
import "./EnquiryModal.scss";

const EnquiryModal = ({ isOpen, onClose, productTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    emailid: "",
    mobile: "",
    comment: `I am interested in ${productTitle || "this insurance plan"}.`,
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // API request mapping
      const payload = {
        name: formData.name,
        emailid: formData.emailid,
        mobile: formData.mobile,
        comment: formData.comment,
      };

      const response = await addContactUs(payload);

      // Check for success code 200
      if (response && response.code === 200) {
        setStatus("success");
        setFormData({ name: "", emailid: "", mobile: "", comment: "" });
      } else {
        throw new Error(response.message || "Submission failed");
      }
    } catch (err) {
      console.error("Enquiry API Error:", err);
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="enquiry-modal-overlay">
        <motion.div
          className="enquiry-modal-main-container"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button className="enquiry-modal-close-trigger" onClick={onClose}>
            <X size={20} />
          </button>

          {status === "idle" || status === "loading" ? (
            <div className="enquiry-modal-content-wrapper">
              <div className="enquiry-modal-header-section">
                <h2>Quick Enquiry</h2>
                <p>Submit your details and we'll get back to you.</p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="enquiry-modal-form-element"
              >
                <div className="enquiry-modal-input-field-group">
                  <User className="enquiry-modal-field-icon" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="enquiry-modal-input-field-group">
                  <Mail className="enquiry-modal-field-icon" size={18} />
                  <input
                    type="email"
                    name="emailid"
                    placeholder="Email ID"
                    required
                    value={formData.emailid}
                    onChange={handleChange}
                  />
                </div>

                <div className="enquiry-modal-input-field-group">
                  <Phone className="enquiry-modal-field-icon" size={18} />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        handleChange({
                          target: { name: "mobile", value },
                        });
                      }
                    }}
                  />
                </div>

                <div className="enquiry-modal-input-field-group enquiry-modal-text-area-type">
                  <MessageSquare
                    className="enquiry-modal-field-icon"
                    size={18}
                  />
                  <textarea
                    name="comment"
                    placeholder="How can we help you?"
                    rows="3"
                    required
                    value={formData.comment}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`enquiry-modal-submit-action-btn ${
                    status === "loading" ? "is-processing" : ""
                  }`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="enquiry-modal-spin-icon" size={18} />{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Request
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Result Feedback UI */
            <motion.div
              className="enquiry-modal-feedback-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status === "success" ? (
                <div className="enquiry-modal-success-state">
                  <div className="enquiry-modal-icon-halo enquiry-modal-is-success">
                    <CheckCircle size={48} />
                  </div>
                  <h3>Request Received!</h3>
                  <p>
                    Thank you for your interest in <b>{productTitle}</b>. Our
                    team will call you soon.
                  </p>
                  <button className="enquiry-modal-exit-btn" onClick={onClose}>
                    Finish
                  </button>
                </div>
              ) : (
                <div className="enquiry-modal-error-state">
                  <div className="enquiry-modal-icon-halo enquiry-modal-is-error">
                    <AlertCircle size={48} />
                  </div>
                  <h3>Submission Failed</h3>
                  <p>{errorMsg}</p>
                  <button
                    className="enquiry-modal-retry-action-btn"
                    onClick={() => setStatus("idle")}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryModal;
