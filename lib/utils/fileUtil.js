/**
 * @param file
 * @return {Promise<string>}
 */
export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reader.abort();
      reject();
    };
  });
}
export function download(src, fileName) {
  const a = document.createElement('a');
  a.setAttribute('href', src);
  a.setAttribute('download', fileName || '');
  a.setAttribute('target', '_blank');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}