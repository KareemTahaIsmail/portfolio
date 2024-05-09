export default class downloadUtils {
  static downloadPDF = (fileUrl: string) => {
    let parts = fileUrl.split("/");
    const fileName = parts[parts.length - 1];
    // Fetch the PDF file
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;

        // Specify the download attribute and file name
        link.setAttribute("download", fileName);

        // Simulate a click on the link to start the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Failed to download PDF:", error);
      });
  };
  
}
