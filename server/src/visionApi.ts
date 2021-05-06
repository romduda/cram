import vision from '@google-cloud/vision';

async function visionApi(url: string): Promise<string | null | undefined> {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'src/apiKey.json',
  });

  const request = {
    image: {
      content: Buffer.from(url, 'base64'),
    },
  };

  const [result] = await client.textDetection(request);
  const googleStr = result.fullTextAnnotation?.text;

  return googleStr;
}

export default visionApi;
