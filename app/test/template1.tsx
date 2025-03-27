
import Image from "next/image";
import html2pdf from "html2pdf.js";
export default function Template1(prop) {

  const handleDownload = () => {
    const element = document.getElementById("print");
    html2pdf().from(element).save();
  };
  
  return (
    <div className="min-h-screen  p-8">
      <button 
        onClick={handleDownload} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded shadow">
        Download PDF
      </button>
      <div id="print" className="max-w-3xl mx-auto bg-white h-[900px] shadow-lg rounded-lg flex flex-col lg:flex-row" style={{ fontSize: `${prop.fontSize}px`, color: prop.color }}>
        <div id="left" className="bg-blue-200 w-full lg:w-1/2 h-full p-6 flex flex-col">
          <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden mb-6">
            <img src={prop.Img} alt="Profile Image" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-bold text-blue-800 mb-2" style={{ fontSize: `${prop.titleSize}px`, color: prop.titleColor }}>Contact</h1>
            <p>Phone: {prop.Phone}</p>
            <p>Email: {prop.Email}</p>
            <p>Address: {prop.Adress}</p>
            <p>LinkedIn: {prop.Linkdin}</p>
          </div>
          <div className="mt-6">
            <h1 className="font-bold text-blue-800 mb-2" style={{ fontSize: `${prop.titleSize}px`, color: prop.titleColor }}>Key Skills</h1>
            <p>{prop.Skill}</p>
          </div>
        </div>

        <div id="right" className="w-full lg:w-1/2 h-full p-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">{prop.Name}</h1>
          <div className="mb-6">
            <h1 className="font-bold text-blue-800 mb-2" style={{ fontSize: `${prop.titleSize}px`, color: prop.titleColor }}>Profile Summary:</h1>
            <p>{prop.Summary}</p>
          </div>
          <div className="border-l-4 border-blue-200 pl-4">
            <h1 className="font-bold text-blue-800 mb-2" style={{ fontSize: `${prop.titleSize}px`, color: prop.titleColor }}>Education</h1>
            <p>{prop.Education}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
