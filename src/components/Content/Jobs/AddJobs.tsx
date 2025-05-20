import React, { useState, ChangeEvent, FormEvent } from "react";
import { Country, State, City } from "country-state-city";
import Select, { SingleValue } from "react-select";
import { motion } from "framer-motion";
import { FiBriefcase, FiDollarSign, FiSend, FiTrash2 } from "react-icons/fi";
import config from "../../../config/config";

interface JobPostFormProps {}

interface FormData {
  title: string;
  salary: string;
  jobtype: string;
  joblevel: string;
  NumberOfPost: number;
  category: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  country: { label: string; value: string } | null;
  state: { label: string; value: string } | null;
  city: { label: string; value: string } | null;
}

interface Errors {
  title?: string;
  salary?: string;
  jobtype?: string;
  joblevel?: string;
  NumberOfPost?: string;
  category?: string;
  description?: string;
  skills?: string;
  responsibilities?: string;
  country?: string;
  state?: string;
  city?: string;
}

const jobTypes = ["Full-Time", "Part-Time", "Internship", "Contract"];
const jobLevels = ["Entry Level", "Mid Level", "Senior Level"];
const categories = ["Software", "Marketing", "Finance", "Healthcare", "Engineering"];

const JobPostForm: React.FC<JobPostFormProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    salary: "",
    jobtype: "",
    joblevel: "",
    NumberOfPost: 1,
    category: "",
    description: "",
    skills: [],
    responsibilities: [],
    country: null,
    state: null,
    city: null,
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: SingleValue<{ label: string; value: string }>) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || null,
    }));
  };

  const handleAddSkill = (e: FormEvent) => {
    e.preventDefault();
    const skillInput = document.getElementById('skillInput') as HTMLInputElement;
    const skillValue = skillInput.value.trim();
    if (skillValue) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, skillValue],
      }));
      skillInput.value = '';
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prevData) => {
      const newSkills = prevData.skills.filter((_, i) => i !== index);
      return {
        ...prevData,
        skills: newSkills,
      };
    });
  };

  const handleAddResponsibility = (e: FormEvent) => {
    e.preventDefault();
    const responsibilityInput = document.getElementById('responsibilityInput') as HTMLInputElement;
    const responsibilityValue = responsibilityInput.value.trim();
    if (responsibilityValue) {
      setFormData((prevData) => ({
        ...prevData,
        responsibilities: [...prevData.responsibilities, responsibilityValue],
      }));
      responsibilityInput.value = '';
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormData((prevData) => {
      const newResponsibilities = prevData.responsibilities.filter((_, i) => i !== index);
      return {
        ...prevData,
        responsibilities: newResponsibilities,
      };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.title || formData.title.length < 3) newErrors.title = "Job title is required and must be at least 3 characters long";
    if (!formData.salary) newErrors.salary = "Salary is required";
    if (!formData.jobtype) newErrors.jobtype = "Job type is required";
    if (!formData.joblevel) newErrors.joblevel = "Job level is required";
    if (!formData.NumberOfPost || formData.NumberOfPost < 1) newErrors.NumberOfPost = "Number of posts is required and must be at least 1";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (formData.skills.length === 0) newErrors.skills = "Please enter at least one skill";
    if (formData.responsibilities.length === 0) newErrors.responsibilities = "Please enter roles & responsibilities of candidate";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = {
      ...formData,
      country: formData.country?.value || '',
      state: formData.state?.value || '',
      city: formData.city?.value || '',
    };

    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${config.apiUrl}/job/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include', 
        body: JSON.stringify(dataToSend),
      });
console.log(formData,"formdata");
      if (response.ok) {
        alert('Job posted successfully!');
        setFormData({
          title: "",
          salary: "",
          jobtype: "",
          joblevel: "",
          NumberOfPost: 1,
          category: "",
          description: "",
          skills: [],
          responsibilities: [],
          country: null,
          state: null,
          city: null,
        });
        setErrors({});
      } else {
        alert('Failed to post job.');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('An error occurred while posting the job.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiBriefcase className="text-blue-500" /> Post a Job
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Title */}
        <div>
          <label className="block text-gray-600">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        {/* Salary */}
        <div>
          <label className="block text-gray-600">Salary</label>
          <div className="relative">
            <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 pl-8 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
        </div>
        {/* Job Type */}
        <div>
          <label className="block text-gray-600">Job Type</label>
          <select
            name="jobtype"
            value={formData.jobtype}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Type</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.jobtype && <p className="text-red-500 text-sm">{errors.jobtype}</p>}
        </div>
        {/* Job Level */}
        <div>
          <label className="block text-gray-600">Job Level</label>
          <select
            name="joblevel"
            value={formData.joblevel}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Level</option>
            {jobLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          {errors.joblevel && <p className="text-red-500 text-sm">{errors.joblevel}</p>}
        </div>
        {/* Number of Posts */}
        <div>
          <label className="block text-gray-600">Number of Posts</label>
          <input
            type="number"
            name="NumberOfPost"
            value={formData.NumberOfPost}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.NumberOfPost && <p className="text-red-500 text-sm">{errors.NumberOfPost}</p>}
        </div>
        {/* Category */}
        <div>
          <label className="block text-gray-600">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        {/* Skills */}
        <div className="md:col-span-2">
          <label className="block text-gray-600">Skills </label>
          <div className="flex items-center gap-2">
            <input
              id="skillInput"
              type="text"
              className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="JavaScript, React, Node.js"
            />
            <button type="button" onClick={handleAddSkill} className="bg-blue-500 text-white p-1 text-sm rounded-lg hover:bg-blue-600 transition">
              Add Skill
            </button>
          </div>
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
          {formData.skills.length > 0 && (
            <ul className="mt-2">
              {formData.skills.map((skill, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg my-1">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(index)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        {/* Responsibilities */}
        <div className="md:col-span-2">
          <label className="block text-gray-600">Responsibilities</label>
          <div className="flex items-center gap-2">
            <input
              id="responsibilityInput"
              type="text"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Manage team, Write reports"
            />
            <button type="button" onClick={handleAddResponsibility} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
              Add Responsibility
            </button>
          </div>
          {errors.responsibilities && <p className="text-red-500 text-sm">{errors.responsibilities}</p>}
          {formData.responsibilities.length > 0 && (
            <ul className="mt-2">
              {formData.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg my-1">
                  {responsibility}
                  <button type="button" onClick={() => handleRemoveResponsibility(index)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Country Selection */}
        <div className="md:col-span-2">
          <label className="block text-gray-600">Location</label>
          <Select
            name="country"
            value={formData.country}
            onChange={(val) => {
              handleSelectChange('country', val);
              setFormData((prevData) => ({
                ...prevData,
                state: null,
                city: null,
              }));
            }}
            options={Country.getAllCountries().map((c) => ({ label: c.name, value: c.isoCode }))}
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>
        {/* State Selection */}
        {formData.country && (
          <div className="md:col-span-2">
            <label className="block text-gray-600">State</label>
            <Select
              name="state"
              value={formData.state}
              onChange={(val) => {
                handleSelectChange('state', val);
                setFormData((prevData) => ({
                  ...prevData,
                  city: null,
                }));
              }}
              options={State.getStatesOfCountry(formData.country?.value || '').map((s) => ({ label: s.name, value: s.isoCode }))}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        )}
        {/* City Selection */}
        {formData.state && (
          <div className="md:col-span-2">
            <label className="block text-gray-600">City</label>
            <Select
              name="city"
              value={formData.city}
              onChange={(val) => handleSelectChange('city', val)}
              options={City.getCitiesOfState(formData.country?.value || '', formData.state?.value || '').map((c) => ({ label: c.name, value: c.name }))}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
        )}
        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="md:col-span-2 w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FiSend /> Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

export default JobPostForm;
