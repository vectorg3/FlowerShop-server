import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        payInfo: {
            type: Object,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);
