import Profile from '../models/Profile.js';

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
    static async updateProfile(id, profileData) {
        try {
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: `${id}` },
                profileData,
                { new: true }
            );
            return updatedProfile;
        } catch (error) {
            console.error(err);
            return { error: err.message };
        }
    }
}
