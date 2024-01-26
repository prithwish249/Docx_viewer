import React, { useState, useRef } from 'react';
import FileViewer from 'react-file-viewer';
import { faPlusCircle, faCircleArrowLeft, faCircleArrowRight, faDownload, faHamburger, faPrint, faQrcode, faSearchMinus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const map = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    //"application/pdf": "pdf",
   // "image/jpeg": "jpeg",
  //  "image/png": "png",
};

const View = () => {
    const [file, setFile] = useState(null);
    const [angle, setAngle] = useState(0);
    const ref = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    const handleDownload = () => {
        if (file) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const rotateRight = () => {
        if (!ref.current) return;
        setAngle(angle + 90);
        ref.current.style.transform = "rotate(" + (angle + 90) + "deg)";
        
        console.log(ref.current);
    }

    const rotateLeft = () => {
        if (!ref.current) return;
        setAngle(angle - 90);
        ref.current.style.transform = "rotate(" + (angle - 90) + "deg)";
        console.log(ref.current);
    }
    const handleFullScreen = () => {
        const fileViewer = document.querySelector('.file-viewer');
    
        if (!document.fullscreenElement) {
            if (fileViewer.requestFullscreen) {
                fileViewer.requestFullscreen();
            } else if (fileViewer.mozRequestFullScreen) { // Firefox
                fileViewer.mozRequestFullScreen();
            } else if (fileViewer.webkitRequestFullscreen) { // Chrome, Safari, Opera
                fileViewer.webkitRequestFullscreen();
            } else if (fileViewer.msRequestFullscreen) { // IE/Edge
                fileViewer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    };
    

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => prevZoom + 0.1);
      };
    
      const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
      };
      const printDiv = (divId) => {
        const printContents = document.getElementById(divId).innerHTML;
        const originalContents = document.body.innerHTML;
      
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
      
        printWindow.onload = function() {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        };
      }
      

    return (
        <div>
            <nav className="nav">
                <li><FontAwesomeIcon icon={faCircleArrowLeft} onClick={rotateLeft} /></li>
                <li><FontAwesomeIcon icon={faSearchPlus} onClick={handleZoomIn} /></li>
                <li><FontAwesomeIcon icon={faSearchMinus} onClick={handleZoomOut} /></li>
                <li><FontAwesomeIcon icon={faCircleArrowRight} onClick={rotateRight}/></li>
                <li><FontAwesomeIcon icon={faPrint} onClick={() => printDiv("print")} /></li>
                <li><FontAwesomeIcon icon={faDownload} onClick={handleDownload} /></li>
                <li><FontAwesomeIcon icon={faQrcode} onClick={handleFullScreen} /></li>

               
                <li>
                    <label htmlFor='file-input'>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </label>
                    <input
                        id='file-input'
                        style={{ display: "none" }}
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </li>
            </nav>
            <div id='print' ref={ref} className='file-viewer' style={{ transform: `scale(${zoomLevel})` }}>
                {file && (
                    <FileViewer
                        fileType={map[file.type]}
                        filePath={URL.createObjectURL(file)}
                        onError={(e) => console.log('Error:', e)}
                    />
                )}
            </div>
        </div>
    );
}

export default View;
