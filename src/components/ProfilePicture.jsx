import React from "react";
import "../styles/main.less";
import profileImage from "./../assets/profile.jpg";

export default function ProfilePicture() {
  return <img src={profileImage} alt="Foto" className="profile-pic" />;
}
