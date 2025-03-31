import { Title } from "@/ui/components/Title";
import { ComponentsTable } from "@/ui/components/Tables";
import { Component } from "@/lib/types/programs";

interface ComponentsSectionProps {
  programComponents: Component[];
}

export const ComponentsSection: React.FC<ComponentsSectionProps> = ({
  programComponents,
}) => {
  return (
    <section id="components">
      <Title text="Перелік компонент програми" />
      <div className="rounded-box border-base-content/5 bg-base-100 m-auto max-w-[88svw] overflow-auto border md:w-full">
        <ComponentsTable components={programComponents} />
      </div>
      <p className="text-base-content/40 mt-2 text-sm">
        *є можливість вибору дисципліни з іншої освітньої програми
      </p>
    </section>
  );
};
