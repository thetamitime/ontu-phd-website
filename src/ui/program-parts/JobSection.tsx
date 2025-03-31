import { Title } from "@/ui/components/Title";
import React from "react";
import { Job } from "@/lib/types/programs";

interface JobSectionProps {
  jobs: Job[];
}

export const JobSection: React.FC<JobSectionProps> = ({ jobs }) => {
  return (
    <section id="job">
      <Title text="Працевлаштування" />
      <div className="flex flex-wrap gap-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="card card-border border-base-300 bg-base-100"
          >
            <div className="card-body grow-0">
              <p className="text-base-content/40">{job.code}</p>
              <h4 className="card-title -mt-2 font-normal">{job.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
