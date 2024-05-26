import React from 'react';

const SupportComponent = () => {
  return (
    <div className="support-container">
      <h1>Support Information</h1>
      <div className="support-content">
        <div className="support-item">
          <h2>General Support</h2>
          <p>If you have any questions or need assistance, please reach out to our general support team.</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> support@agrohelp.com</p>
        </div>
        <div className="support-item">
          <h2>Technical Support</h2>
          <p>For technical issues or website support, contact our tech support.</p>
          <p><strong>Phone:</strong> (234) 567-8901</p>
          <p><strong>Email:</strong> techsupport@agrohelp.com</p>
        </div>
        <div className="support-item">
          <h2>Sales Support</h2>
          <p>For inquiries related to sales and products, our sales team is here to help.</p>
          <p><strong>Phone:</strong> (345) 678-9012</p>
          <p><strong>Email:</strong> sales@agrohelp.com</p>
        </div>
        <div className="support-item">
          <h2>Customer Service</h2>
          <p>For customer service and order issues, please contact our customer service team.</p>
          <p><strong>Phone:</strong> (456) 789-0123</p>
          <p><strong>Email:</strong> customerservice@agrohelp.com</p>
        </div>
      </div>
    </div>
  );
};

export default SupportComponent;