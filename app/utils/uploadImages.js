import axios from 'axios';

/**
 * 图片上传
 * @param images:string[] 图片资源base64
 * @param callback: (data: sting[] ) => void 回调函数 返回图片id列表
 */
export function uploadImages(images, callback, error) {
  const inputName = 'uploadFile';
  const apiUrl = axios.defaults.baseURL + axios.api.upLoadPicture; // 接口地址
  const ajax = (url, data, success) => { // ajax
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        xhr.onreadystatechange = null;
        if (xhr.status === 200) {
          success(xhr.responseText);
        }
      }
    }
    xhr.open('POST', url, true);
    let header = sessionStorage.getItem('getHeader'); // 添加请求头
    header = JSON.parse(header);
    /*eslint-disable */
    delete(header.Accept); // reset appheader
    delete(header['Content-Type']); // reset appheader
    for (let i in header) {
      xhr.setRequestHeader(i, header[i]);
    }
    xhr.send(data);
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

  const setFormData = blob => { // 转formdata
    const formData = new FormData();
    formData.append(inputName, blob, `${(new Date().getTime())}.${blob.type.split('/')[1]}`);
    return formData;
  }

  const imageSize = images.length;
  const result = [];
  for (let i = 0; i < imageSize; i++) {
    result.push(new Promise(resolve => {
      ajax(apiUrl, setFormData(dataURLtoBlob(images[i])), response => {
        const res = JSON.parse(response);
        if (res.code > 0) {
          layer.open({
            content: res.message,
            skin: 'msg',
            time: 1
          })
        }
        if (res.code < 0) {
          layer.open({
            content: '网络错误，请稍后重试',
            skin: 'msg',
            time: 1
          })
        } else if (res.status) {
          layer.open({
            content: '网络错误，请稍后重试',
            skin: 'msg',
            time: 1
          })
          console.log(res)
        }
        resolve(res.data);
      });
    }));
  }
  Promise.all(result).then(values => {
    if (window.layer) {
      window.layer.closeAll(); //疯狂模式，关闭所有层
    }
    callback(values);
  }).catch(e => error(e))
}

export default uploadImages;
