/**
 * 图片base64
 * @param {string || array} path 图片路径
 * @param {float} quality 图片压缩质量,默认0.92
 * @param {function} finishcallback :(base64: string[]) => void 回调函数
 */
export function imageBase64(path, quality, finishcallback) { // dataurl转canvas转dataurl
  const dealImage = (pathsrc, callback) => {
    const img = new Image();
    img.src = pathsrc;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 默认按比例压缩
      const w = img.width;
      const h = img.height;
      let initQuality = 0.92; // 默认图片质量为0.92
      //生成canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // 创建属性节点
      const anw = document.createAttribute('width');
      anw.nodeValue = w;
      const anh = document.createAttribute('height');
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(img, 0, 0, w, h);
      // 图像质量
      if (quality && quality <= 1 && quality > 0) {
        initQuality = quality;
      }
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', initQuality);
      // 回调函数返回base64的值
      callback(base64);
    }
  }
  // 判断数据类型
  if (typeof path === 'string') { // string
    dealImage(path, base64 => {
      finishcallback(base64);
    });
  }
  if (Object.prototype.toString.call(path) === '[object Array]') { // array
    const size = path.length;
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(new Promise(resolve => {
        dealImage(path[i], base64 => {
          resolve(base64);
        });
      }));
    }
    console.log(result.length);
    Promise.all(result).then(values => finishcallback(values));
  }
}

export default imageBase64;
