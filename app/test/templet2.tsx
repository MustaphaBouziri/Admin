import Image from "next/image";

export default function Template2(prop) {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div
        className="max-w-3xl w-full bg-white h-[900px] shadow-lg rounded-lg p-8 flex flex-col items-center text-center"
        style={{ fontSize: `${prop.fontSize}px`, color: prop.color }}
      >
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
          <Image
            src={prop.Img}
            alt="Profile Image"
            width={96}
            height={96}
            objectFit="cover"
            className="rounded-full border-4"
          />
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold ">{prop.Name}</h1>

        {/* Profile Summary */}
        <h2
          className="font-bold mt-6"
          style={{ fontSize: `${prop.titleSize}px`, color: prop.titleColor }}
        >
          Profile Summary:
        </h2>
        <p className="text-gray-700 break-words">{prop.Summary}</p>

        {/* Two-column layout for Education & Other Info */}
        <div className="w-full flex flex-col lg:flex-row justify-between mt-8 px-8">
          {/* Left Side - Education */}
          <div
            className="w-full lg:w-[48%] text-left pl-4"
            style={{ borderLeft: `4px solid ${prop.titleColor}` }}
          >
            <h2
              className="font-bold"
              style={{ fontSize: `${prop.titleSize}px`, color: prop.titleColor }}
            >
              Education
            </h2>
            <p className="text-gray-700 break-words">{prop.Education}</p>
          </div>

          {/* Right Side - Contact & Other Info */}
          <div
            className="w-full lg:w-[48%] text-left pl-4 mt-8 lg:mt-0"
            style={{ borderLeft: `4px solid ${prop.titleColor}` }}
          >
            <h2
              className="font-bold"
              style={{ fontSize: `${prop.titleSize}px`, color: prop.titleColor }}
            >
              Contact
            </h2>
            <p className="break-words">Phone: {prop.Phone}</p>
            <p className="text-gray-700 break-words">Email: {prop.Email}</p>
            <p className="text-gray-700 break-words">Address: {prop.Adress}</p>
            <p className="text-gray-700 break-words">LinkedIn: {prop.Linkdin}</p>

            {/* Key Skills */}
            <div className="mt-6 pl-4" style={{ borderLeft: `4px solid ${prop.titleColor}` }}>
              <h2
                className="font-bold"
                style={{
                  fontSize: `${prop.titleSize}px`,
                  color: prop.titleColor,
                }}
              >
                Key Skills
              </h2>
              <p className="text-gray-700 break-words">{prop.Skill}</p>
            </div>

            {/* Hobby */}
            <div className="mt-6 pl-4" style={{ borderLeft: `4px solid ${prop.titleColor}` }}>
              <h2
                className="font-bold"
                style={{
                  fontSize: `${prop.titleSize}px`,
                  color: prop.titleColor,
                }}
              >
                Hobby
              </h2>
              <p className="text-gray-700 break-words">{prop.Hobby}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
