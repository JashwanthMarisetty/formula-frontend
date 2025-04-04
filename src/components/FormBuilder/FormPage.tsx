
import React from 'react';
import { FormElement } from './FormElement';
import { useFormBuilder } from '@/context/FormBuilderContext';

interface FormPageProps {
  pageIndex: number;
}

export const FormPage: React.FC<FormPageProps> = ({ pageIndex }) => {
  const { pages, currentPageIndex, previewMode } = useFormBuilder();
  const page = pages[pageIndex];

  if (pageIndex !== currentPageIndex) {
    return null;
  }

  return (
    <div className={`bg-white shadow-md rounded-md w-full max-w-3xl mx-auto mb-8 relative ${previewMode ? 'p-0' : ''}`}>
      {pageIndex > 0 && !previewMode && (
        <div className="absolute -top-8 right-0 text-sm text-gray-500">
          Page {pageIndex + 1}
        </div>
      )}
      
      {!previewMode && (
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">FormMate</h1>
        </div>
      )}
      
      <div className="p-6">
        {page.elements.length > 0 ? (
          page.elements.map((element) => (
            <FormElement
              key={element.id}
              element={element}
            />
          ))
        ) : (
          !previewMode && (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-center">Drag your first question here from the left.</p>
            </div>
          )
        )}
      </div>
      
      {page.elements.length > 0 && (
        <div className="p-6 flex justify-center">
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
