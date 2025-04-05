import React, { useState } from "react";

type FieldType = "text" | "date" | "multipleChoice" | "singleChoice" | "email";

interface Condition {
  field: string;
  state: string;
  value: string;
  action: string;
  targetField: string;
}

const DynamicForm: React.FC = () => {
  const [conditions, setConditions] = useState<Condition[]>([
    { field: "", state: "", value: "", action: "", targetField: "" }
  ]);

  const availableFields = [
    { label: "Name", value: "name", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Date", value: "date", type: "date" },
    { label: "Question", value: "question", type: "multipleChoice" },
  ];

  const handleAddCondition = () => {
    setConditions([...conditions, { field: "", state: "", value: "", action: "", targetField: "" }]);
  };

  const handleConditionChange = (index: number, key: keyof Condition, value: string) => {
    const newConditions = [...conditions];
    newConditions[index][key] = value;
    setConditions(newConditions);
  };

  const getFieldType = (fieldValue: string): FieldType | undefined => {
    return availableFields.find(field => field.value === fieldValue)?.type;
  };

  const renderStateOptions = (fieldType: FieldType | undefined) => {
    switch (fieldType) {
      case "text":
        return ["Is Equal To", "Is Not Equal To", "Is Empty", "Is Filled"];
      case "date":
        return ["Is Empty", "Is Filled", "Before", "After", "Is Equal to Date", "Not Equal to Date"];
      case "multipleChoice":
      case "singleChoice":
        return ["Is Equal To", "Is Not Equal To"];
      case "email":
        return ["Contains", "Does not Contain", "Starts With", "Doesn't Start With", "Ends With", "Doesn't End With", "Is Empty", "Is Filled"];
      default:
        return [];
    }
  };

  const actionOptions = ["Hide", "Show", "Hide Multiple", "Show Multiple"];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4">SHOW/HIDE FIELD</h2>
      {conditions.map((condition, index) => {
        const fieldType = getFieldType(condition.field);
        return (
          <div key={index} className="mb-4 border p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block mb-1 font-semibold">IF</label>
              <select
                value={condition.field}
                onChange={(e) => handleConditionChange(index, "field", e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select field</option>
                {availableFields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">STATE</label>
              <select
                value={condition.state}
                onChange={(e) => handleConditionChange(index, "state", e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select field state</option>
                {renderStateOptions(fieldType).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">VALUE</label>
              <input
                type="text"
                value={condition.value}
                onChange={(e) => handleConditionChange(index, "value", e.target.value)}
                className="border p-2 w-full"
                placeholder="Please type a value here"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">DO</label>
              <select
                value={condition.action}
                onChange={(e) => handleConditionChange(index, "action", e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select action</option>
                {actionOptions.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">FIELD</label>
              <select
                value={condition.targetField}
                onChange={(e) => handleConditionChange(index, "targetField", e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select field</option>
                {availableFields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleAddCondition} className="bg-blue-500 text-white p-2 rounded">
              +
            </button>
          </div>
        );
      })}
      <button className="bg-green-500 text-white p-2 rounded mt-4">
        SAVE
      </button>
    </div>
  );
};

export default DynamicForm;