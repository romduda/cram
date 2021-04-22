import vision from '@google-cloud/vision';

async function visionApi(url:string):Promise<any> {
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'src/apiKey.json'
  });

  // Performs label detection on the image file
  const result = await client.textDetection(url);
  const googleStr = result[0].fullTextAnnotation?.text;
  console.log('google retrieved: ', googleStr);
}

export default visionApi;