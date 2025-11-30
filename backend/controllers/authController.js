const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ---------------------- REGISTER ----------------------
exports.register = async (req, res) => {
  try {
    console.log("📝 Registration request received:", req.body);
    
    const { name, email, password, role, employeeId, department } = req.body;

    // Validate required fields
    if (!name || !email || !password || !employeeId) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check existing email
    console.log("🔍 Checking if email exists...");
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check existing employeeId
    console.log("🔍 Checking if employeeId exists...");
    const existingEmpId = await User.findOne({ employeeId });
    if (existingEmpId) {
      console.log("❌ Employee ID already exists:", employeeId);
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    console.log("✅ Email and Employee ID are unique");

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log("👤 Creating user...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
      employeeId,
      department: department || "General",
    });

    console.log("✅ User created successfully:", user._id);

    // Generate token
    console.log("🎫 Generating token...");
    const token = generateToken(user._id);
    console.log("✅ Token generated");

    res.json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- LOGIN ----------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------- GET LOGGED IN USER ----------------------
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};