const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.model('User', userSchema);

// Test user data
const testUsers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456'
    },
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123'
    }
];

async function insertTestUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing users
        await UserModel.deleteMany({});
        console.log('Cleared existing users');

        // Insert test users
        for (const userData of testUsers) {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            // Create user
            const user = new UserModel({
                ...userData,
                password: hashedPassword
            });

            await user.save();
            console.log(`Created user: ${userData.name}`);
        }

        console.log('All test users inserted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

insertTestUsers(); 