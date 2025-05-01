import React, { useState, useEffect } from "react";
import { Card, Spin, message } from "antd";
import axios from "axios";

const ProfileSettings = () => {
  const [profile, setProfile] = useState(null); // State to hold profile data
  const [isLoading, setIsLoading] = useState(true); // Loading state for profile data

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const partnerId = localStorage.getItem("partnerId"); // Retrieve partnerId from localStorage
        if (!partnerId) {
          message.error("No partner ID found.");
          return;
        }

        const partnerToken = localStorage.getItem("partnerToken");
        const response = await axios.get(
          `http://localhost:5000/api/auth/partnerProfile/${partnerId}`, // Use partnerId in the URL
          {
            headers: { Authorization: `Bearer ${partnerToken}` },
          }
        );

        setProfile(response.data); // Set the profile data in state
      } catch (error) {
        message.error("Failed to fetch profile data");
        console.error(error);
      } finally {
        setIsLoading(false); // End the loading state
      }
    };

    fetchProfile(); // Fetch profile data when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  if (isLoading) {
    return <Spin tip="Loading profile..." />; // Show loading spinner while data is being fetched
  }

  return (
    <div className="profile-settings">
      <h2 className="text-center">Service Provider Profile</h2>

      {profile ? (
        <Card bordered={false} style={{ width: 400 }} className="mx-auto">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Service Category:</strong> {profile.serviceCategory}</p>
          <p><strong>Document:</strong> {profile.document}</p>
          <p><strong>Location:</strong> {JSON.stringify(profile.location)}</p>
          <p><strong>Rating:</strong> {profile.rating}</p>
          <p><strong>Joined At:</strong> {new Date(profile.joinedAt).toLocaleString()}</p>
        </Card>
      ) : (
        <p>No profile data available.</p> // Handle case where no profile data is returned
      )}
    </div>
  );
};

export default ProfileSettings;
