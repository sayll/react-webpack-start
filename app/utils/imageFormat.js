/**
 * @description 图片压缩
 * @param blob||file图片数据
 * @param options: {quality:0.5,width:'',height:''} 
 * @param successCallback: (data: blob) => void  成功回调函数,回调参数blob
 */
export function imageFormat(blob, options, successCallback) {
  const readBlobAsDataURL = (blobData, callback) => { // blob转dataurl
    const a = new FileReader();
    a.onload = e => {
      callback(e.target.result);
    };
    a.readAsDataURL(blobData);
  }
  const dealImage = (path, optionsData, callback) => { // dataurl转canvas转dataurl
    const img = new Image();
    img.src = path;
    img.onload = () => {
      const that = this;
      // 默认按比例压缩
      let w = that.width;
      let h = that.height;
      const scale = w / h;
      w = optionsData.width || w;
      h = optionsData.height || (w / scale);
      let quality = 0.7; // 默认图片质量为0.7
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
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (optionsData.quality && optionsData.quality <= 1 && optionsData.quality > 0) {
        quality = optionsData.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
    }
  }
  const dataURLtoBlob = dataurl => { // dataurl转blob
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }
  // 操作流程
  readBlobAsDataURL(blob, dataurl => {
    dealImage(dataurl, options, base64 => {
      successCallback(dataURLtoBlob(base64)); // callback blob
    });
  });
}

export default imageFormat;
