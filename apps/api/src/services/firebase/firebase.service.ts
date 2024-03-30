import admin from 'firebase-admin';
import serviceAccount from '../../config/js-vacancy-test-task-firebase-adminsdk-s724h-e7d7b26949.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'gs://js-vacancy-test-task.appspot.com',
});

const bucket = admin.storage().bucket();
async function getImageUrl(imagePath: string) {
  try {
    const file = bucket.file('image/' + imagePath);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-30-3000',
    });

    return url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
}

async function uploadFileToStorage(fileData: any) {
  try {
    const fileRef = bucket.file('image/' + fileData.originalname);
  
    // Загружаем файл, используя буфер и другую метаинформацию из объекта fileData
    await fileRef.save(fileData.buffer, {
      metadata: {
        contentType: fileData.mimetype,
      },
    });
  
    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

function uploadImage(path: string) {
  bucket.upload(path);
}

export default {
  getImageUrl,
  uploadFileToStorage,
  uploadImage,
};