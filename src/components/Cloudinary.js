const url = `https://api.cloudinary.com/v1_1/duztah40b/image/upload`;

const cloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "chat-realtime");

    try {
        const response = await fetch(url, {
            method: 'post',
            body: formData
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Cloudinary error response:', errorResponse);
            throw new Error(`HTTP error! status: ${response.status}, ${errorResponse.error.message}`);
        }

        const responseData = await response.json();
        console.log('Cloudinary response:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
}

export default cloudinary;
