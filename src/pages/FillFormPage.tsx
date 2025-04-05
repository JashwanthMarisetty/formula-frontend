import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FillFormPage = () => {
  const { ownerId, formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/public/forms/id/${formId}`);
        setForm(res.data);
      } catch (err) {
        console.error('Error fetching form:', err);
      }
    };

    fetchForm();
  }, [ownerId, formId]);

  const handleChange = (fieldId, value) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User responses:', responses);
    alert('Form submitted successfully!');
    // You can send to backend here if needed
  };

  if (!form) {
    return <div className="text-center mt-10">Loading form...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6 mt-8">
      <h1 className="text-3xl font-bold text-violet-700 mb-2">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((field) => (
          <div key={field.id}>
            {/* Skip display for non-input types like heading */}
            {field.type === 'heading' && (
              <h2 className="text-2xl font-bold text-gray-800 my-4">{field.label}</h2>
            )}

            {field.type === 'paragraph' && (
              <p className="text-gray-600 italic mb-2">{field.label}</p>
            )}

        

            {!['heading', 'paragraph'].includes(field.type) && (
              <>
                <label className="block text-md font-semibold text-gray-800 mb-1">
                  {field.label}
                </label>

                {/* Text Input */}
                {['full_name', 'email', 'phone', 'address', 'short_text'].includes(field.type) && (
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {/* Textarea */}
                {['long_text', 'paragraph'].includes(field.type) && (
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {/* Date */}
                {field.type === 'date_picker' && (
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {/* Time */}
                {['time', 'appointment'].includes(field.type) && (
                  <input
                    type="time"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {/* File Upload */}
                {field.type === 'file_upload' && (
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => handleChange(field.id, e.target.files[0])}
                  />
                )}

                {/* Single Choice (Radio) */}
                {field.type === 'single_choice' && field.options && (
                  <div className="space-y-1 ml-2">
                    {field.options.map((option, idx) => (
                      <label key={idx} className="block">
                        <input
                          type="radio"
                          name={field.id}
                          value={option}
                          onChange={() => handleChange(field.id, option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}

                {/* Multiple Choice (Checkboxes) */}
                {field.type === 'multiple_choice' && field.options && (
                  <div className="space-y-1 ml-2">
                    {field.options.map((option, idx) => (
                      <label key={idx} className="block">
                        <input
                          type="checkbox"
                          value={option}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setResponses((prev) => {
                              const prevValues = prev[field.id] || [];
                              return {
                                ...prev,
                                [field.id]: checked
                                  ? [...prevValues, option]
                                  : prevValues.filter((val) => val !== option),
                              };
                            });
                          }}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}

                {/* Star/Scale/Spinner/Other: Placeholder */}
                {['star_rating', 'scale_rating', 'spinner', 'input_table'].includes(field.type) && (
                  <div className="text-gray-500 italic">
                    Placeholder for {field.type} (to be implemented)
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FillFormPage;
