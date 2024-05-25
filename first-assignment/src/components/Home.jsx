import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
];

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCountryCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phoneCountryCode)
      newErrors.phoneCountryCode = "Country code is required";
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.panNo || formData.panNo.length !== 10) {
      newErrors.panNo = "PAN No. must be exactly 10 digits";
    }
    if (!formData.aadharNo || formData.aadharNo.length !== 12) {
      newErrors.aadharNo = "Aadhar No. must be exactly 12 digits";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "panNo" || name === "aadharNo") {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      navigate("/success", { state: formData });
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key) && key !== "Backspace" && key !== "Tab") {
      e.preventDefault();
    }
  };

  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={toggleShowPassword}>
          {formData.showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Country Code:</label>
        <select
          name="phoneCountryCode"
          value={formData.phoneCountryCode}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {countryCodes.map((code) => (
            <option key={code.code} value={code.code}>
              {code.country}
            </option>
          ))}
        </select>
        {errors.phoneCountryCode && <p>{errors.phoneCountryCode}</p>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        {errors.country && <p>{errors.country}</p>}
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <p>{errors.city}</p>}
      </div>
      <div>
        <label>PAN No.:</label>
        <input
          type="text"
          name="panNo"
          value={formData.panNo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {errors.panNo && <p>{errors.panNo}</p>}
      </div>
      <div>
        <label>Aadhar No.:</label>
        <input
          type="text"
          name="aadharNo"
          value={formData.aadharNo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {errors.aadharNo && <p>{errors.aadharNo}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Home;