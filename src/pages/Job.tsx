import { FormEvent, useEffect, useState } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import Swal from "sweetalert2";

import { IoIosArrowBack } from "react-icons/io";

import { useAppSelector } from "@/store/store";

import { Spinner, Button, Modal } from "flowbite-react";

import { getSingleJob } from "@/api/jobs";

import { createApplication } from "@/api/applications";

import { AppTextInput, AppTextarea } from "@/components";

interface JobParamsInterface {
  jobId: string;
}

interface jobInterface {
  id: number;
  company_id: number;
  title: string;
  description: string;
  type: string;
  salary: number;
  companies: companyInterface;
}

interface companyInterface {
  id: number;
  manager: string;
  name: string;
  location: string;
}

interface jobApplicationInterface {
  id?: number;
  user_id: number;
  job_id: number;
  reason: string;
  portfolio: string;
  experience_years: string;
  linkedin: string;
}

export const Job = () => {
  const { jobId } = useParams<JobParamsInterface>();
  const { user } = useAppSelector((state) => state.user);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState<jobInterface | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobApplicationInputs, setJobApplicationInputs] =
    useState<jobApplicationInterface>({
      job_id: parseInt(jobId),
      user_id: user!.id,
      linkedin: "",
      experience_years: "",
      portfolio: "",
      reason: "",
    });

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      const data = await getSingleJob(jobId);
      setJob(data);
      setIsLoading(false);
    };
    fetchJob();
  }, [jobId]);

  // change inputs
  const changeInputHandler = (input: string, value: string) => {
    setJobApplicationInputs((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  // close modal
  const onCloseModal = () => {
    setOpenModal(false);
    setJobApplicationInputs({
      job_id: parseInt(jobId),
      user_id: user!.id,
      linkedin: "",
      experience_years: "",
      portfolio: "",
      reason: "",
    });
  };

  // Apply to job
  const jobApplicationHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data } = await createApplication(jobApplicationInputs);
    if (data) {
      // Application submitted successfully
      setIsSubmitting(false);
      onCloseModal();
      
      Swal.fire({
        icon: "success",
        title: "Application Received",
        text: "Thanks for applying for this position. We will reach you via email in the next 48 hours",
      }).then((result) => {
        if (result.isConfirmed) {
          history.replace("/applications");
        }
      });
    }
  };

  return (
    <div className="py-16 flex flex-col gap-4">
      <div>
        <Link to="/jobs">
          <IoIosArrowBack className="text-primary text-3xl font-bold" />
        </Link>
      </div>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex flex-col gap-6">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400 flex flex-col">
              <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                {job?.title} position at{" "}
                <span className="font-extrabold">{job?.companies.name}</span>
              </h2>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {job?.description}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-light">
                Location:{" "}
                <span className="font-bold">{job?.companies.location}</span>
              </span>
              <span className="text-sm font-light">
                Work type: <span className="font-bold">{job?.type}</span>
              </span>
              <span className="text-sm font-light">
                Salary: <span className="font-bold">${job?.salary}/year</span>
              </span>
            </div>
            <div>
              <Button
                onClick={() => setOpenModal(true)}
                disabled={!user}
                gradientMonochrome="success"
              >
                <span className="font-bold">
                  {user ? "Apply to this Job" : "Login to Apply"}
                </span>
              </Button>
            </div>
            <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
              <Modal.Header />
              <Modal.Body>
                <form className="space-y-6" onSubmit={jobApplicationHandler}>
                  <h3 className="text-xl font-extrabold text-center text-gray-900 dark:text-white">
                    Apply to this Job
                  </h3>

                  <AppTextInput
                    id="jobTitle"
                    additionalProps={{ readOnly: true }}
                    label="Job Title"
                    value={job?.title}
                    type="text"
                  />

                  <AppTextInput
                    id="userNames"
                    additionalProps={{ readOnly: true }}
                    label="Applicant names"
                    value={user?.names}
                    type="text"
                  />

                  <AppTextInput
                    id="userEmail"
                    additionalProps={{ readOnly: true }}
                    label="Applicant email"
                    value={user?.email}
                    type="text"
                  />

                  <AppTextInput
                    id="experienceYears"
                    label="Years of experience"
                    type="number"
                    value={jobApplicationInputs.experience_years}
                    onChange={(e) =>
                      changeInputHandler("experience_years", e.target.value)
                    }
                  />
                  <AppTextInput
                    id="portfolio"
                    label="Website/portfolio"
                    type="url"
                    value={jobApplicationInputs.portfolio}
                    onChange={(e) =>
                      changeInputHandler("portfolio", e.target.value)
                    }
                  />
                  <AppTextInput
                    id="linkedin"
                    label="Linkedin"
                    type="url"
                    value={jobApplicationInputs.linkedin}
                    onChange={(e) =>
                      changeInputHandler("linkedin", e.target.value)
                    }
                  />

                  <AppTextarea
                    id="reason"
                    label={`Why do you want to work at ${job?.companies.name}?`}
                    value={jobApplicationInputs.reason}
                    onChange={(e) =>
                      changeInputHandler("reason", e.target.value)
                    }
                  />

                  <div className="w-full">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      gradientMonochrome="success"
                    >
                      {isSubmitting ? "Please wait..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </section>
      )}
    </div>
  );
};
