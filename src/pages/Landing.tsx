import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../hooks/useAuthCheck";
import { useEffect } from "react";
import { SignUpRoute } from "@/apis";
import axios from "axios";

const Landing = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const registerUser = async () => {
    if (user && isAuthenticated) {
      const token = await getAccessTokenSilently();
      if (localStorage.getItem("userRegistered")) return;

      try {
        const response = await axios.post(
          SignUpRoute,
          {
            email: user.email,
            AuthOid: user.sub,
            name: user.name,
          },
          {
            headers: { Authorization: `Bearer ${token}`},
          }
        );

        if (response.status === 201) {
          console.log("User Created:", response.data);
          localStorage.setItem("userRegistered", "true");
        } else if (response.status === 300) {
          console.log("User is null (MULTIPLE_CHOICES)");
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      registerUser();
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-violet-600">FormMate</div>
          <div className="flex space-x-2">
            {!isAuthenticated ? (
              <Button
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Create beautiful forms in minutes with{" "}
              <span className="text-violet-600">FormMate</span>
            </h1>
            <p className="text-lg text-gray-600">
              Build professional forms, surveys and questionnaires without any
              technical knowledge. Get started for free.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {!isAuthenticated ? (
                <Button
                  variant="outline"
                  className="border-violet-300 text-violet-700 hover:bg-violet-50"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border-violet-300 text-violet-700 hover:bg-violet-50 px-8 py-6"
                  onClick={() =>
                    (window.location.href = "http://localhost:8080/forms")
                  }
                >
                  Build Form
                </Button>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/MyImages/image.png"
              alt="FormMate Interface"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How would you like to start?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                {/* Icon for Form */}
              </div>
              <h3 className="text-xl font-semibold mb-2">Form</h3>
              <p className="text-gray-600">
                Create forms with logic, payments, and automation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                {/* Icon for AI Agent */}
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Agent</h3>
              <p className="text-gray-600">
                Create trained agents to guide users and answer questions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                {/* Icon for Workflow */}
              </div>
              <h3 className="text-xl font-semibold mb-2">Workflow</h3>
              <p className="text-gray-600">
                Easily automate workflows and streamline approvals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                {/* Icon for App */}
              </div>
              <h3 className="text-xl font-semibold mb-2">App</h3>
              <p className="text-gray-600">
                Make downloadable mobile apps with no coding.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} FormMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;