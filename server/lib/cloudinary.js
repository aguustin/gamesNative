import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'drmcrdf4r', 
  api_key: '521116467426574', 
  api_secret: 'IyZYzTmTrxIpuEHp04kZ6lWk40g' 
});

export const uploadImage = async (req, res) => {
    console.log(req.file);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'gamesNative'
    });
    console.log(uploadResult);
    res.send(uploadResult);
}