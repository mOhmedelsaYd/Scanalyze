const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const staffSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Receptionist', 'LabTechnician'], 
    },
    laboratory: {
        type: String,
        required: true,
    },
    experience: {
            type: Number,
            required: true,
    },
    imageProfile: String,
    addresses: 
    {
        type: String,
        required: true,
    }
}, { timestamps: true });



staffSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();

this.password = await bcrypt.hash(this.password, 10);
next();
});

const setImageURL = (doc) => {
    if (doc.imageProfile) {
        const imageUrl = `${process.env.BASE_URL}/staff/${doc.imageProfile}`;
        doc.imageProfile = imageUrl;
    }
};
// findOne, findAll and update
staffSchema.post('init', (doc) => {
    setImageURL(doc);
});

// create
staffSchema.post('save', (doc) => {
    setImageURL(doc);
});

module.exports = mongoose.model('Staff', staffSchema);
