import { WebApp } from 'meteor/webapp';
import Images from '../images';

WebApp.connectHandlers.use('/appimage', (req, res) => {
  if (req.method === 'GET') {
    const appident = req.url.split('/')[1];
    let query = {};
    if (appident) {
      query = { identification: appident };
    } else {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    const img = Images.findOne(query);
    if (!img) {
      // Image not found
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    // Image found
    res.writeHead(200, {
      'Content-Type': img.mtype,
    });
    const buf = Buffer.from(img.datas, 'base64');
    res.write(buf);
    res.end();
  } else {
    res.writeHead(405); // Code HTTP 405 = Method Not Allowed
    res.end('HTTP Method Not Allowed');
  }
});
