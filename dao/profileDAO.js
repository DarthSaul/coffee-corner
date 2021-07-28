import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { cloudinary } from '../cloudinary/index.js';

export default class ProfileDAO {
    static async getProfileByUserId(user_id) {
        try {
            const profile = await Profile.findOne({ user: `${user_id}` });
            return { profile };
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
    static async getProfileById(profile_id) {
        try {
            const profile = await Profile.findById(profile_id);
            return { profile };
        } catch (error) {
            console.error(err);
            return { error: err.message };
        }
    }
    static async createProfile(user_id, profileData) {
        try {
            const profile = new Profile(profileData);
            const user = await User.findById(user_id);
            profile.user = user_id;
            user.profile = profile._id;
            await profile.save();
            await user.save();
            return profile;
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
    static async updateProfile(user_id, profileData) {
        try {
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: `${user_id}` },
                profileData,
                { new: true }
            );
            return updatedProfile;
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
    static async avatarUpload(user_id, imageData) {
        try {
            const profile = await Profile.findOne({ user: `${user_id}` });
            if (profile.avatar) {
                await cloudinary.uploader.destroy(profile.avatar.filename);
            }
            profile.avatar = imageData;
            await profile.save();
            return profile;
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
}
