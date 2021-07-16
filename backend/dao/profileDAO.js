import Profile from '../models/Profile.js';
import { cloudinary } from '../cloudinary/index.js';

export default class ProfileDAO {
    static async getProfile(id) {
        try {
            const profile = await Profile.findOne({ user: `${id}` });
            return { profile };
        } catch (err) {
            console.error(err);
            return { error: err.message };
        }
    }
    static async createProfile(user_id, profileData) {
        try {
            const profile = new Profile(profileData);
            profile.user = user_id;
            await profile.save();
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
        } catch (error) {
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
        } catch (error) {
            console.error(err);
            return { error: err.message };
        }
    }
}
