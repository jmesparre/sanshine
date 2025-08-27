import Accordion from '@/components/ui/Accordion';
import { AccordionItem as AccordionItemType } from "@/types";

interface FaqModalContentProps {
  items: AccordionItemType[];
}

const FaqModalContent = ({ items }: FaqModalContentProps) => {
  return (
    <div className="p-4 overflow-y-auto h-full custom-scrollbar">
      <h2 className="text-[2.9rem] leading-13 pb-3 font-alegreya font-semibold mb-4">Preguntas Frecuentes</h2>
      <hr className="pb-8 border-black"/>
      <Accordion items={items} />
    </div>
  );
};

export default FaqModalContent;
