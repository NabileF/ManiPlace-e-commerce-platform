import React, { useState } from 'react';

function SupplierProfileForm() {
  const [profileData, setProfileData] = useState({
    identification: '',
    manufacturingCapabilities: '',
    products: '',
    wholesaleOperations: '',
    distributionChannels: '',
    availableInventory: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in local storage

    try {
      const response = await fetch('/api/supplier/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <form id="supplier-profile-form" onSubmit={handleSubmit}>
      <label htmlFor="identification">Identification:</label>
      <select id="identification" name="identification" value={profileData.identification} onChange={handleChange}>
        <option value="Manufacturer">Manufacturer</option>
        <option value="Wholesaler">Wholesaler</option>
      </select>

      <label htmlFor="manufacturingCapabilities">Manufacturing Capabilities:</label>
      <textarea id="manufacturingCapabilities" name="manufacturingCapabilities" value={profileData.manufacturingCapabilities} onChange={handleChange}></textarea>

      <label htmlFor="products">Products:</label>
      <textarea id="products" name="products" value={profileData.products} onChange={handleChange}></textarea>

      <label htmlFor="wholesaleOperations">Wholesale Operations:</label>
      <textarea id="wholesaleOperations" name="wholesaleOperations" value={profileData.wholesaleOperations} onChange={handleChange}></textarea>

      <label htmlFor="distributionChannels">Distribution Channels:</label>
      <textarea id="distributionChannels" name="distributionChannels" value={profileData.distributionChannels} onChange={handleChange}></textarea>

      <label htmlFor="availableInventory">Available Inventory:</label>
      <textarea id="availableInventory" name="availableInventory" value={profileData.availableInventory} onChange={handleChange}></textarea>

      <button type="submit">Save Profile</button>
    </form>
  );
}

export default SupplierProfileForm;
