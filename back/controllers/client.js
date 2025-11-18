const Client = require("../models/clients");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Memberships = require("../models/memberships");
const db = require("../database/index");
const { Op } = require("sequelize");
const secretKey = "salim123";
module.exports = {
  register: async (req, res) => {
    try {
      const { name, lastName, email, pass, phone, cinNum, batinda } = req.body;
      if (phone.toString().length !== 8) {
        return res.status(404).json({ err: "phone number not valid" });
      }
      let a = await Client.findOne({ where: { email } });
      if (a) {
        return res.status(404).json({ err: "email in use" });
      }
      const hashed = await bcrypt.hash(pass, 10);
      let d = await Client.create({
        name,
        lastName,
        email,
        password: hashed,
        telNumb: phone,
        cinNum,
        batinda,
      });
      res.status(201).json({
        name: d.name,
        lastName: d.lastName,
        email: d.email,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Check database connection
      try {
        await db.authenticate();
      } catch (dbError) {
        console.error("Database connection error:", dbError);
        return res.status(500).json({ message: "Database connection failed. Please check your database configuration." });
      }

      // Find user (case-insensitive email search)
      let user = await Client.findOne({ 
        where: {
          email: {
            [Op.like]: email.toLowerCase()
          }
        }
      });
      
      // If not found with lowercase, try exact match
      if (!user) {
        user = await Client.findOne({ where: { email } });
      }
      
      if (!user) {
        return res.status(404).json({ message: "User not found. Please check your email or sign up." });
      }
      
      // Compare password
      const hashed = await bcrypt.compare(password, user.password);
      if (!hashed) {
        return res.status(401).json({ message: "Incorrect password. Please try again." });
      }

      // Generate token
      const token = jwt.sign({ id: user.id, role: "client" }, secretKey, {
        expiresIn: "24h",
      });
      
      console.log("✓ Client login successful:", user.email);
      return res.status(200).json({ 
        token, 
        user: {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email
        }
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
  },
  getHome: async (req, res) => {
    try {
      if (!req.id) {
        return res.status(404).json({ err: "err" });
      }
      if (req.id) {
        let d = await Client.findAll({ where: { id: req.id } });
        res.status(200).json(d);
      }
    } catch (err) {
      res.status(500).json({ err: "server err" });
    }
  },
  updateProfileClient:async(req,res)=>{
    try{
      const {fname,lname,email,newPass}=req.body
      let hashed=await bcrypt.hash(newPass,10)
      let d=Client.update({name:fname,lastName:lname,email,password:hashed},{where:{id:req.params.id}})
      if(d) return res.status(200).json('updated')
      return res.status(404).json('not updated')

    }catch(err){
      res.status(500).json('internal server err')
    }

  },
  updateMembership:async(req,res)=>{
      try{
        
        let d=await Memberships.create(req.body)
        if(d){ 
          console.log(d)
      return res.status(200).json('created')}
        return res.status(404).json('not created')
      }catch(err){
        res.status(500).json('internal serv err')
      }
  }
  
};
// exports.login = functions.https.onRequest(this.login);
