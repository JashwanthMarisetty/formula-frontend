import React from 'react';
import { Plus, Eye, EyeOff, Trash } from 'lucide-react';
import { useFormBuilder } from '@/context/FormBuilderContext';
import { ElementsSidebar } from './ElementsSidebar';
import { FormPage } from './FormPage';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export const FormBuilder: React.FC = () => {
  const { 
    toggleSidebar, 
    pages, 
    currentPageIndex, 
    addPage, 
    goToPage, 
    previewMode, 
    togglePreviewMode,
    deletePage
  } = useFormBuilder();

  return (
    <div
      className={`min-h-screen ${previewMode ? "bg-gray-50" : "bg-gray-100"}`}
    >
      {/* Header - hidden in preview mode */}
      {!previewMode && (
        <header className="bg-violet-600 shadow-sm">
          <div className="flex justify-between items-center px-4 py-3 container mx-auto">
            <div className="flex items-center space-x-4">
              <a href="http://localhost:8080/">
                <div className="text-xl font-bold text-white cursor-pointer">
                  Formula
                </div>
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="text-violet-100">
                All changes saved at{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <button className="px-3 py-1 border border-violet-400 text-white rounded-md hover:bg-violet-500">
                Add Collaborators
              </button>
              <button className="px-3 py-1 border border-violet-400 text-white rounded-md hover:bg-violet-500">
                Help
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Tabs - hidden in preview mode */}
      {!previewMode && (
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <div className="container mx-auto flex">
            <div className="px-6 py-3 font-medium bg-purple-600">BUILD</div>
            <Link to="/use-conditions" className="px-6 py-3 font-medium hover:bg-purple-700">
              USE CONDITIONS
            </Link>
            <div className="px-6 py-3 font-medium">PUBLISH</div>
            <div className="ml-auto flex items-center px-6">
              <span className="mr-2">Preview Form</span>
              <button
                onClick={togglePreviewMode}
                className={`w-12 h-6 ${
                  previewMode ? "bg-violet-300" : "bg-white"
                } rounded-full p-1 flex items-center ${
                  previewMode ? "justify-end" : "justify-start"
                }`}
              >
                <div className="w-4 h-4 bg-violet-600 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Mode Toggle - always visible */}
      <div className={`container mx-auto ${previewMode ? "py-4" : ""}`}>
        {previewMode && (
          <div className="flex justify-end mb-4">
            <button
              onClick={togglePreviewMode}
              className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Exit Preview
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className={`${previewMode ? "" : "py-6"}`}>
          <div className="flex">
            {/* Left sidebar toggle button - hidden in preview mode */}
            {!previewMode && (
              <div className="mr-8">
                <button
                  className="flex items-center px-4 py-2 bg-violet-800 text-white rounded-md hover:bg-violet-700"
                  onClick={toggleSidebar}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Element
                </button>
              </div>
            )}

            {/* Form content */}
            <div
              className={`flex-1 relative ${
                previewMode ? "max-w-3xl mx-auto" : ""
              }`}
            >
              {!previewMode && (
                <div className="mb-8 text-center text-gray-500 border-b border-dashed pb-4">
                  + ADD YOUR LOGO
                </div>
              )}

              {pages.map((_, index) => (
                <FormPage key={index} pageIndex={index} />
              ))}

              {/* Add new page button - hidden in preview mode */}
              {!previewMode && (
                <button
                  className="w-full py-3 border border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 rounded-md mb-8"
                  onClick={addPage}
                >
                  + ADD NEW PAGE HERE
                </button>
              )}

              {/* Page navigation and delete page button */}
              {pages.length > 1 && (
                <div className="flex justify-between items-center">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-md"
                    onClick={() => goToPage(currentPageIndex - 1)}
                    disabled={currentPageIndex === 0}
                  >
                    Back
                  </button>
                  <div className="text-sm text-gray-500">
                    Page {currentPageIndex + 1} of {pages.length}
                  </div>
                  <div className="flex">
                    {!previewMode && (
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                        onClick={() => deletePage(currentPageIndex)}
                        title="Delete current page"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      className="px-4 py-2 bg-violet-600 text-white rounded-md"
                      onClick={() => goToPage(currentPageIndex + 1)}
                      disabled={currentPageIndex === pages.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Element Sidebar - hidden in preview mode */}
      {!previewMode && <ElementsSidebar />}
    </div>
  );
};