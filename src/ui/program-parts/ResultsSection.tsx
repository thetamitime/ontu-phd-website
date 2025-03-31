import { Title } from "@/ui/components/Title";

interface ResultsSectionProps {
  programResults: string[];
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  programResults,
}) => {
  return (
    <section id="results">
      <Title text="Програмні результати навчання" />
      <div>
        {programResults.map((result, index) => (
          <p key={index}>
            РН{index + 1}. {result}
          </p>
        ))}
      </div>
    </section>
  );
};
