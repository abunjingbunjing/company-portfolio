const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const serviceRoutes = require('./routes/serviceRoutes');
const caseStudyRoutes = require('./routes/caseStudyRoutes');
const workingProcessRoutes = require('./routes/workingProcessRoutes');
const teamRoutes = require('./routes/teamRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const path = require("path");

//rate limit code start
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }); // 10 requests / 15 min
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// image upload 
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../public/uploads"))
);
// image upload end

app.use('/api/contact', contactLimiter);
app.use('/api/auth/login', loginLimiter);
//rate limit code end

const allowedOrigins = [
  "http://localhost:3000",
  "https://company-portfolio-kappa-eosin.vercel.app"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/services', serviceRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/working-process', workingProcessRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;