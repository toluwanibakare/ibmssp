/**
 * Utility to upload files to Cloudinary using Unsigned Upload Presets
 */

export async function uploadToCloudinary(file, folder = 'ibmssp_documents') {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dph3q3x2s';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ibmssp_unsigned';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  if (folder) {
    formData.append('folder', folder);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `Cloudinary upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      url: data.secure_url || data.url,
      public_id: data.public_id,
      format: data.format,
    };
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    throw new Error(err.message || 'Failed to upload document to Cloudinary');
  }
}
