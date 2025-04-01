import { Accordion, AccordionItem } from "@heroui/react";

export default function AppAccordion({
  data = [],
  childrenField,
  onChooseItem,
}: {
  data: any[];
  childrenField?: string;
  onChooseItem?: (item: any) => void;
}) {
  const renderTreeAccordion = (data: any[], isNotRecursive = false) => {
    return (
      <div className="flex flex-col">
        {data.map((item, index) => {
          return item[childrenField as string] &&
            item[childrenField as string].length > 0 ? (
            <div className=" border-b-1">
              <Accordion
                selectionMode="multiple"
                key={item._id | index}
                className="px-0"
              >
                <AccordionItem
                  title={item.name}
                  classNames={{
                    base: "p-0 m-0",
                    title: "text-xl group-hover:text-primary",
                    trigger: "py-3 px-0 group",
                    content: "p-0 pl-4 pb-2",
                  }}
                >
                  {renderTreeAccordion(item[childrenField as string])}
                </AccordionItem>
              </Accordion>
            </div>
          ) : (
            <div
              className={`cursor-pointer hover:text-primary text-xl py-3 ${
                isNotRecursive && "border-b-1"
              } last:border-none`}
              key={item._id | index}
              onClick={() => onChooseItem?.(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  };

  return renderTreeAccordion(data, true);
}
