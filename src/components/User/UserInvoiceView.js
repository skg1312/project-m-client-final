import React from 'react';

const UserPdfViewer = ({ pdfUrl }) => {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <iframe
        title="PDF Viewer"
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default UserPdfViewer;