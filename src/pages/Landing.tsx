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
    isLoading,
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
            headers: { Authorization: `Bearer ${token}` },
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
          <div className="text-xl font-bold text-violet-600">Formula</div>
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
            {/* <Link to="/signup">
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">Sign Up</Button>
            </Link> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Create beautiful forms in minutes with{" "}
              <span className="text-violet-600">Formula</span>
            </h1>
            <p className="text-lg text-gray-600">
              Build professional forms, surveys and questionnaires without any
              technical knowledge. Get started for free.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {/* <Link to="/signup">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6">
                  Create Free Account
                </Button>
              </Link> */}
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
              alt="Formula Interface"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why choose Formula?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
              <p className="text-gray-600">
                Build beautiful forms in minutes with our intuitive
                drag-and-drop builder.
              </p>
            </div>
            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100+ Templates</h3>
              <p className="text-gray-600">
                Choose from our library of professionally designed templates for
                any purpose.
              </p>
            </div> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Get insights from your form submissions with built-in analytics
                tools.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Formula. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
