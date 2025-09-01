import { CircleCheckBig, CircleX } from 'lucide-react';

interface Section {
  title: string;
  list: string[];
  preListParagraph?: string;
  postListParagraph?: string;
}

interface TargetAudienceContent {
  for: Section;
  notFor: Section;
  benefits: Section;
}

interface TargetAudienceModalContentProps {
  content: TargetAudienceContent;
}

const TargetAudienceModalContent = ({ content }: TargetAudienceModalContentProps) => {
  return (
    <div className="p-4 overflow-y-auto h-full custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-[2.9rem] leading-13 pb-3 font-alegreya font-semibold mb-4">{content.for.title}</h2>
       <hr className="pb-8 border-black"/>
        <ul className="space-y-2 px-2 pb-5">
          {content.for.list.map((item, index) => (
            <li key={index} className="flex items-start">
              <CircleCheckBig className="text-gray-400 h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-[2.9rem] leading-13 pb-3 font-alegreya font-semibold mb-4 w-3/4">{content.notFor.title}</h2>
        <hr className="pb-8 border-black"/>
        <ul className="space-y-2 px-2 pb-5">
          {content.notFor.list.map((item, index) => (
            <li key={index} className="flex items-start">
              <CircleX className="text-gray-400 h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-[2.9rem] leading-13 pb-5 font-alegreya font-semibold mb-4">{content.benefits.title}</h2>
         <hr className="pb-10 border-black"/>
        {content.benefits.preListParagraph && <p className="mb-4">{content.benefits.preListParagraph}</p>}
        <ul className="space-y-2">
          {content.benefits.list.map((item, index) => (
            <li key={index} className="flex items-start">
              <CircleCheckBig className="text-gray-400 h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {content.benefits.postListParagraph && <p className="mt-4">{content.benefits.postListParagraph}</p>}
      </div>
    </div>
  );
};

export default TargetAudienceModalContent;
