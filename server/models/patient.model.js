const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    nationalId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    nationalIdImage: {
        type: String,
        required: true,
    }
})


patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});


const setImageURL = (doc) => {
    if (doc.nationalIdImage) {
        const imageUrl = `${process.env.BASE_URL}/patients/${doc.nationalIdImage}`;
        doc.nationalIdImage = imageUrl;
    }
};

patientSchema.post('init', (doc) => {
    setImageURL(doc);
});

patientSchema.post('save', (doc) => {
    setImageURL(doc);
});

module.exports = mongoose.model('Patient', patientSchema);