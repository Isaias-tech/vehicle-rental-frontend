import { getUserProfile, updateUserProfile } from '../../api/UserAccount.api';
import { UserProfile } from '../../types/UserAccount';
import { useState, useEffect } from 'react';

export const ProfileUserDetailsForm = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [formChanged, setFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<UserProfile>({
    birth_date: '',
    gender: '',
    phone_number: '',
    country: '',
    city: '',
    address: '',
    profile_picture: undefined,
    passport: undefined,
    drivers_license: undefined,
    national_id: undefined,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profile = await getUserProfile();
    setFormData({
      birth_date: profile.birth_date || '',
      gender: profile.gender || '',
      phone_number: profile.phone_number || '',
      country: profile.country || '',
      city: profile.city || '',
      address: profile.address || '',
    });
    setProfileData(profile);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setError('');
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFormChanged(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setFormChanged(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const pData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          pData.append(key, value as string | Blob);
        }
      });

      await updateUserProfile(pData);
      setIsLoading(false);
      setFormChanged(false);
      loadData();
    } catch (err) {
      setIsLoading(false);
      setError('Update failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Profile Picture:</span>
        </label>
        <input
          type="file"
          name="profile_picture"
          accept="image/*"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        {profileData?.profile_picture && (
          <figure>
            <img
              src={profileData.profile_picture as unknown as string}
              alt="Profile"
              className="rounded-lg mt-2"
            />
          </figure>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Passport:</span>
        </label>
        <input
          type="file"
          name="passport"
          accept="image/*,application/pdf"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        {profileData?.passport && (
          <figure>
            <img
              src={profileData.passport as unknown as string}
              alt="Profile"
              className="rounded-lg mt-2"
            />
          </figure>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Driver's License:</span>
        </label>
        <input
          type="file"
          name="drivers_license"
          accept="image/*,application/pdf"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        {profileData?.drivers_license && (
          <figure>
            <img
              src={profileData.drivers_license as unknown as string}
              alt="Profile"
              className="rounded-lg mt-2"
            />
          </figure>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">National ID:</span>
        </label>
        <input
          type="file"
          name="national_id"
          accept="image/*,application/pdf"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        {profileData?.national_id && (
          <figure>
            <img
              src={profileData.national_id as unknown as string}
              alt="Profile"
              className="rounded-lg mt-2"
            />
          </figure>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Phone Number:</span>
        </label>
        <input
          type="text"
          placeholder="Phone Number"
          className="input input-bordered w-full max-w-xs"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Country:</span>
        </label>
        <input
          type="text"
          placeholder="Country"
          className="input input-bordered w-full max-w-xs"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">City:</span>
        </label>
        <input
          type="text"
          placeholder="City"
          className="input input-bordered w-full max-w-xs"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Address:</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Address..."
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Gender:</span>
        </label>
        <input
          type="text"
          placeholder="Gender..."
          className="input input-bordered w-full max-w-xs"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Birthdate:</span>
        </label>
        <input
          type="date"
          placeholder="Birthdate..."
          className="input input-bordered w-full max-w-xs"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
        />
      </div>

      {formChanged && (
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Save'}
          </button>
        </div>
      )}

      {error && <div className="alert alert-error mt-5">{error}</div>}
    </form>
  );
};
