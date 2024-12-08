export const uploadFile = async (file: { uri: string; type: string; name: string }): Promise<string> => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    } as any);
  
    try {
      const response = await fetch('http://100.102.83.94:8088/api/v1/files/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!response.ok) {
        const responseText = await response.text();
        console.error('Server response:', responseText);
        throw new Error(`File upload failed: ${response.status} ${response.statusText}`);
      }
  
      const responseText = await response.text();
      console.log('Server response:', responseText);
  
      // Assuming the API returns just the file name
      return responseText.trim();
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };
  